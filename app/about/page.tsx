import { SettingsContent } from "@/components/settings/SettingsContent";

export default function InfosPage() {
    return (
        <div className="h-[100dvh] max-h-[100dvh] bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden flex flex-col touch-none">
            <SettingsContent defaultView="menu" />
        </div>
    );
}
