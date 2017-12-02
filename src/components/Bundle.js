import React, { Component } from 'react';

import Loading from './Loading';

class Bundle extends Component {
	componentWillMount() {
		// short for 'module' but that's a keyword in js, so 'mod'
		this.state = { mod: null };

		const { load } = this.props;
		this.runLoad(load);
	}

	componentWillReceiveProps = ({ load }) =>
		this.props.load !== load && this.runLoad(load)

	runLoad = load => {
		this.setState({ mod: null });

		// handle both es imports and cjs
		load(mod => this.setState({ mod: mod.default || mod }));
	}

	render() {
		const { fn } = this.props;
		const { mod } = this.state;
		return fn(mod);
	}
}

const newBundle = (lazyComponent, LoadingComponent) => props => (
	<Bundle
		load={lazyComponent}
		fn={
			LoadedComponent => LoadedComponent ?
				<LoadedComponent {...props} /> : <LoadingComponent {...props} />
		}
	/>
);

const createBundle = mod => newBundle(mod, Loading);

export { Bundle, newBundle, createBundle };
