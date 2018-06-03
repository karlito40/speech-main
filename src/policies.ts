import ShowConversationFriendGate from "./auth/gates/ShowConversationFriendGate";
import { GateManager } from "./lib/gates";
import { Request } from "express";
import { User } from "./entities/user";
import { replace } from "./lib/string";

export const policies = [
  { scope: "show-conversation-friend", gate: ShowConversationFriendGate }
];

export function getPolicy(scope: string) {
  return policies.find(policy => policy.scope == scope);
}

export async function isScopesAuthorized(scopes: Array<string>, req: Request, user: User) {
  if (!scopes.length) {
    return true;
  }

  const placeholders = { ...req.params, ...{ me: user.id } };
  scopes = scopes.map(scope => replace(scope, placeholders));

  return (
    await createGateManager(req, user, scopes).isAuthorized()
    && user.hasScope(scopes)
  );
}

export function createGateManager(req: Request, user: User, scopes: Array<string>, ) {
  const manager = new GateManager();
  for (const scope of scopes) {
    const policy = getPolicy(scope);
    if (policy && policy.gate) {
      manager.add(new policy.gate(req, user));
    }
  }


  return manager;
}