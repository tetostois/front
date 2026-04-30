import { clsx } from "clsx";

/**
 * Sélection de module — select HTML natif + Tailwind.
 * Flèche native du navigateur (pas de chevron custom) pour éviter les bugs de positionnement.
 */
export default function ModuleFormationSelect({ modules, valueId, onChange, disabled, error }) {
   const strValue = valueId != null && valueId !== "" ? String(valueId) : "";

   const handleChange = (e) => {
      const v = e.target.value;
      if (!v) {
         onChange(null);
         return;
      }
      const mod = modules?.find((m) => String(m.idModule) === String(v));
      onChange(mod ?? null);
   };

   return (
      <div className="w-full">
         <label
            htmlFor="module-formation-select"
            className="mb-2 block text-sm font-semibold text-slate-700"
         >
            Sélectionnez un module
         </label>
         <select
            id="module-formation-select"
            name="moduleFormation"
            disabled={disabled}
            value={strValue}
            onChange={handleChange}
            className={clsx(
               "block w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition",
               "border-slate-300 hover:border-primary",
               "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25",
               "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
               error && "border-red-500 focus:border-red-500 focus:ring-red-200"
            )}
         >
            <option value="" disabled>
               — Choisir un module —
            </option>
            {modules?.map((m) => (
               <option key={m.idModule} value={String(m.idModule)}>
                  {m.titre}
               </option>
            ))}
         </select>
         <p className="mt-2 text-sm text-slate-500">Choisissez le module auquel appartient ce cours</p>
         {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
      </div>
   );
}
