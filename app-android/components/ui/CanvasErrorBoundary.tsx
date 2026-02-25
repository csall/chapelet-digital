"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Error boundary specifically for WebGL/Canvas components.
 * On iOS, GPU context loss or memory pressure can crash Canvas components.
 * This prevents the crash from propagating to the entire React tree.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        // Silent in production — just recover gracefully
        if (process.env.NODE_ENV === "development") {
            console.warn("[CanvasErrorBoundary] WebGL crash caught:", error.message);
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="fixed inset-0 -z-10 bg-[#010208]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-rose-950/20" />
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/[0.06] rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-500/[0.04] rounded-full blur-[100px]" />
                </div>
            );
        }
        return this.props.children;
    }
}
