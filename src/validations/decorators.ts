import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { getRepository } from "typeorm";
import { Not } from "typeorm";

export function IsUnique(Entity: Object, onProperty?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    onProperty = onProperty || propertyName;
    registerDecorator({
      name: "IsUnique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{ Entity, onProperty }],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [{ Entity, onProperty }] = args.constraints;
          const relatedId = (args.object as any).id;
          const findOptions = { [onProperty]: value };
          if (relatedId) {
            (findOptions as any).id = Not(relatedId);
          }

          return !await getRepository(Entity).findOne(findOptions);
        },

        defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
          return `The field ${onProperty} already exist`;
        }
      }
    });
  };
}
