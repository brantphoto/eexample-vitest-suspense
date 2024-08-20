import React from "react";

interface Props {
	fallback: React.ReactNode;
	children: React.ReactNode;
}
interface State {
	hasError: boolean;
	error: unknown;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error:unknown) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			console.log(`Error: ${this.state.error}`);
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
