import { ONBOARDING_STATUSES, toDateInputValue } from "@/lib/utils";

export type OnboardingFormValues = {
  employeeId?: string;
  fullName?: string;
  email?: string;
  phone?: string | null;
  position?: string;
  department?: string;
  startDate?: Date | string | null;
  reportingManager?: string | null;
  managerEmail?: string | null;
  annualSalary?: number | null;
  equipmentNeeded?: string | null;
  specialNotes?: string | null;
  status?: string;
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaults?: OnboardingFormValues;
  submitLabel?: string;
};

const field =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";
const label = "block text-sm font-medium text-slate-700";

export default function OnboardingForm({
  action,
  defaults = {},
  submitLabel = "Save",
}: Props) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="employeeId">
            Employee ID *
          </label>
          <input id="employeeId" name="employeeId" required defaultValue={defaults.employeeId ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="fullName">
            Full Name *
          </label>
          <input id="fullName" name="fullName" required defaultValue={defaults.fullName ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email *
          </label>
          <input id="email" name="email" type="email" required defaultValue={defaults.email ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" defaultValue={defaults.phone ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="position">
            Position *
          </label>
          <input id="position" name="position" required defaultValue={defaults.position ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="department">
            Department *
          </label>
          <input id="department" name="department" required defaultValue={defaults.department ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="startDate">
            Start Date *
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={toDateInputValue(defaults.startDate)}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="status">
            Status *
          </label>
          <select id="status" name="status" defaultValue={defaults.status ?? "Initiated"} className={field}>
            {ONBOARDING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="reportingManager">
            Reporting Manager
          </label>
          <input id="reportingManager" name="reportingManager" defaultValue={defaults.reportingManager ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="managerEmail">
            Manager Email
          </label>
          <input id="managerEmail" name="managerEmail" type="email" defaultValue={defaults.managerEmail ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="annualSalary">
            Annual Salary
          </label>
          <input
            id="annualSalary"
            name="annualSalary"
            type="number"
            step="1"
            min="0"
            defaultValue={defaults.annualSalary ?? ""}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="equipmentNeeded">
            Equipment Needed
          </label>
          <input id="equipmentNeeded" name="equipmentNeeded" defaultValue={defaults.equipmentNeeded ?? ""} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="specialNotes">
            Special Notes
          </label>
          <textarea
            id="specialNotes"
            name="specialNotes"
            rows={3}
            defaultValue={defaults.specialNotes ?? ""}
            className={field}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
