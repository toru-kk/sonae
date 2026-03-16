export type PlanType = "free" | "standard" | "premium";

export type PlanLimits = {
  gear: number;
  packages: number;
  aiSuggest: number;
};

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free:     { gear: 30,       packages: 3,        aiSuggest: 3 },
  standard: { gear: 200,      packages: 20,       aiSuggest: 30 },
  premium:  { gear: Infinity, packages: Infinity,  aiSuggest: 100 },
};

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[(plan as PlanType)] ?? PLAN_LIMITS.free;
}
