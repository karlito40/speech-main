import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { getRepository } from "typeorm";
import { Not } from "typeorm";

export function IsUnique(validationOptions?: ValidationOptions, onEntityClass?: Object, onProperty?: string) {
  return function (object: Object, propertyName: string) {
    onProperty = onProperty || propertyName;
    onEntityClass = onEntityClass || object.constructor.name;
    registerDecorator({
      name: "IsUnique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{ onEntityClass, onProperty }],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [{ onEntityClass, onProperty }] = args.constraints;
          const relatedId = (args.object as any).id;
          const findOptions = { [onProperty]: value };
          if (relatedId) {
            (findOptions as any).id = Not(relatedId);
          }

          return !await getRepository(onEntityClass).findOne(findOptions);
        },

        defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
          return `The field ${onProperty} already exist`;
        }
      }
    });
  };
}
