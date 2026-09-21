import { OFFBOARDING_STATUSES, toDateInputValue } from "@/lib/utils";

export type OffboardingFormValues = {
  fullName?: string;
  employeeId?: string;
  department?: string;
  exitDate?: Date | string | null;
  reasonForExit?: string | null;
  equipmentNotes?: string | null;
  status?: string;
  exitInterview?: boolean;
  equipmentReturn?: boolean;
  systemAccessRemoved?: boolean;
  finalPaycheck?: boolean;
  knowledgeTransfer?: boolean;
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaults?: OffboardingFormValues;
  submitLabel?: string;
};

const field =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";
const label = "block text-sm font-medium text-slate-700";

const checklist = [
  { name: "exitInterview", label: "Exit Interview" },
  { name: "equipmentReturn", label: "Equipment Return" },
  { name: "systemAccessRemoved", label: "System Access Removed" },
  { name: "finalPaycheck", label: "Final Paycheck" },
  { name: "knowledgeTransfer", label: "Knowledge Transfer" },
] as const;

export default function OffboardingForm({
  action,
  defaults = {},
  submitLabel = "Save",
}: Props) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="fullName">
            Full Name *
          </label>
          <input id="fullName" name="fullName" required defaultValue={defaults.fullName ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="employeeId">
            Employee ID *
          </label>
          <input id="employeeId" name="employeeId" required defaultValue={defaults.employeeId ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="department">
            Department *
          </label>
          <input id="department" name="department" required defaultValue={defaults.department ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="exitDate">
            Exit Date *
          </label>
          <input
            id="exitDate"
            name="exitDate"
            type="date"
            required
            defaultValue={toDateInputValue(defaults.exitDate)}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="reasonForExit">
            Reason for Exit
          </label>
          <input id="reasonForExit" name="reasonForExit" defaultValue={defaults.reasonForExit ?? ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="status">
            Status *
          </label>
          <select id="status" name="status" defaultValue={defaults.status ?? "Outstanding"} className={field}>
            {OFFBOARDING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="equipmentNotes">
            Equipment Notes
          </label>
          <textarea
            id="equipmentNotes"
            name="equipmentNotes"
            rows={2}
            defaultValue={defaults.equipmentNotes ?? ""}
            className={field}
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">Exit checklist</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {checklist.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                name={item.name}
                defaultChecked={Boolean(defaults[item.name])}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

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
