import { Profile } from "../entities/Profile";
import { ProfilePhoto } from "../entities/ProfilePhoto";
import { User } from "../entities/User";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { saveEntity } from "../lib/entity";
import mkdirp from "mkdirp-promise";

export default class ProfileController extends BaseController {
  protected repository: Repository<Profile>;

  boot() {
    this.repository = getRepository(Profile);
  }

  @isAuthenticated("show-profiles")
  async get() {
    const { id } = this.req.params;
    return this.json(await this.repository.findOne(id));
  }

  @isAuthenticated("show-profiles")
  async list() {
    return await this.paginate(this.repository);
  }

  @isAuthenticated("manage-profile", ["manage-profile-self", { userIdRef: "userId" } ])
  async create() {
    const user = await getRepository(User).findOneOrFail(this.req.body.userId, { relations: ["profile"] });
    if (user.profile) {
      return this.error(null, "PROFILE_ALREADY_DEFINED");
    }

    const inputs = { ...this.req.body, ...{ user }};
    const { entity, errors } = await saveEntity(Profile, inputs);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

  @isAuthenticated("manage-profile", "manage-profile-self")
  async update() {
    const { entity, errors } = await saveEntity(Profile, this.req.body, this.req.params.id);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }


  @isAuthenticated("manage-profile", "manage-profile-self")
  async createPhoto() {
    const files = (this.req as any).files;
    if (!files || !files.image) {
      return this.error(null, "UNKNOW_SRC_FILE");
    }

    const file = files.image;
    const ext = file.name.split(".").pop();
    const profile = await this.repository.findOneOrFail(this.req.params.id, { relations: ["user"] });

    const rootPath = `/users/${profile.user.id}/profile`;
    const folder = `./public${rootPath}`;
    await mkdirp(folder);
    const newName = `${Date.now()}.${ext}`;
    await file.mv(`${folder}/${newName}`);

    const url = `${rootPath}/${newName}`;
    const inputs = { url, profile };
    const { entity, errors } = await saveEntity(ProfilePhoto, inputs);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

  @isAuthenticated("manage-profile", "manage-profile-self")
  async getCorrespondingProfiles() {
    const profile = await this.repository.findOneOrFail(this.req.params.id);
    if (!profile) {
      return this.json([]);
    }

    return await this.paginate(this.repository, {
      where: {
        gender: profile.forGender,
        forGender: profile.gender
      }
    });
  }

  @isAuthenticated("manage-profile", "manage-profile-self")
  async deletePhoto() {
    const repository = getRepository(ProfilePhoto);
    const photo = await repository.findOneOrFail(this.req.params.photoId);

    const { id } = photo;
    await repository.remove(photo);

    return this.json({ id });
  }
}
