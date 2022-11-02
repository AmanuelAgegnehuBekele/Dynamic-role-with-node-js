const { createMongoAbility } = require("@casl/ability");
const get = require("lodash.get");

const parseCondition = (template: any, vars: any) => {
  try {
    let data: any = {};

    if (!template) {
      return null;
    } else {
      JSON.parse(JSON.stringify(template), (key, rawValue) => {
        if (rawValue[0] !== "$") {
          return rawValue;
        }

        const name = rawValue.slice(2, -1);
        const value = get(vars, name);

        if (typeof value === "undefined") {
          throw new ReferenceError(`Variable ${name} is not defined`);
        }

        data[key] = value;
        return data;
      });
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const defineAbilitiesFor = (permission: any, user: any) => {
  let parsedConditions: any;
  if (permission) {
    let ability = permission.map((p: any) => {
      parsedConditions = parseCondition(p.permission.conditions, {
        user,
      });
      let action = p.permission.action;
      let subject = p.permission.subject;
      let fields = p.permission.fields;
      let conditions = parsedConditions;
      return {
        action,
        subject,
        fields,
        conditions,
      };
    });
    return createMongoAbility(ability);
  }
};

export const ForbiddenOperationError = {
  from: (abilities: any) => ({
    throwUnlessCan: (...args: any) => {
      if (!abilities.can(...args)) {
        throw new Error("Permission denied");
      }
    },
  }),
};
