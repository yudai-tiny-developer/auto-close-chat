function touch(target) {
	const t = new Touch({ identifier: Date.now(), target: target });

	target.dispatchEvent(new TouchEvent('touchstart', {
		touches: [t],
		changedTouches: [t],
	}));

	setTimeout(() => {
		target.dispatchEvent(new TouchEvent('touchend', {
			changedTouches: [t],
		}));
	}, 100);
}

function closeChatIfChatCollapsed() {
	const c = app.querySelector('ytd-live-chat-frame#chat');
	if (c) {
		if (!c.attributes['collapsed']) {
			const b = app.querySelector('ytd-toggle-button-renderer.ytd-live-chat-frame');
			if (b) {
				touch(b);
			} else {
				console.warn('ytd-toggle-button-renderer.ytd-live-chat-frame not found');
			}
		}
	}
}

const app = document.querySelector('ytd-app');

new MutationObserver((mutations, observer) => mutations.filter(m => m.target.nodeName === 'TITLE').forEach(() => closeChatIfChatCollapsed())).observe(document.head, {
	subtree: true,
	childList: true,
});
