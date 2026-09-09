/** Global open/close state for the quote dialog. */
class QuoteState {
	open = $state(false);
	/** Where the request came from — submitted with the form for attribution. */
	source = $state('site');

	show(source = 'site') {
		this.source = source;
		this.open = true;
	}

	hide() {
		this.open = false;
	}
}

export const quote = new QuoteState();
