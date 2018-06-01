import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { getRepository } from "typeorm";

export function IsUnique(Entity: Object, onProperty?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    onProperty = onProperty || propertyName;
    registerDecorator({
      name: "isLongerThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{ Entity, onProperty }],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [{ Entity, onProperty }] = args.constraints;
          return !await getRepository(Entity).findOne({[onProperty]: value});
        },

        defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
          return `The field ${onProperty} already exist`;
        }
      }
    });
  };
}
