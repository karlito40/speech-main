import ManageProfileSelfGate from "./auth/gates/ManageProfileSelfGate";
import ManageUserSelfGate from "./auth/gates/ManageUserSelfGate";
import { GateManager } from "./lib/gates";
import { Request } from "express";
import { User } from "./entities/user";
import { placeholder } from "./lib/string";

export const policies = [
  { scope: "manage-profile-self", gate: ManageProfileSelfGate },
  { scope: "manage-user-self", gate: ManageUserSelfGate },
];

export function getPolicy(scope: string) {
  return policies.find(policy => policy.scope == getRealScopeRef(scope));
}

export async function isScopesAuthorized(scopes: Array<string>, req: Request, user: User) {
  if (!scopes.length) {
    return true;
  }

  const placeholders = { ...req.params, ...{ me: user.id } };
  const scopeWithoutPlaceholder = scopes.map(scope => placeholder(getRealScopeRef(scope), placeholders));

  return (
    await createGateManager(req, user, scopes).isAuthorized()
    || user.hasScope(scopeWithoutPlaceholder)
  );
}

export function getRealScopeRef(scope) {
  return Array.isArray(scope) ? scope[0] : scope;
}

export function getScopeOptions(scope) {
  return Array.isArray(scope) ? scope[1] : {};
}

export function createGateManager(req: Request, user: User, scopes: Array<string>, ) {
  const manager = new GateManager();
  for (const scope of scopes) {
    const policy = getPolicy(scope);
    if (policy && policy.gate) {
      manager.add(new policy.gate(req, user, getScopeOptions(scope)));
    }
  }


  return manager;
}