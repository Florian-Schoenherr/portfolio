export type VoteColor = 'red' | 'yellow' | 'green';

const COLORS: Record<VoteColor, string> = {
  red: '#ef4444',
  yellow: '#f59e0b',
  green: '#10b981',
};

/** In-memory only — nothing persisted. Resets on page reload. */
const sessionVotes = new Map<string, VoteColor>();

function applyCardHue(card: HTMLElement, color: string | null) {
  if (!color) {
    card.style.removeProperty('--vote-color');
    card.classList.remove('scenario--tinted');
    return;
  }
  card.style.setProperty('--vote-color', color);
  card.classList.add('scenario--tinted');
}

function updateCardUI(card: HTMLElement, vote: VoteColor | undefined) {
  const resultEl = card.querySelector<HTMLElement>('[data-vote-result]');
  const buttons = card.querySelectorAll<HTMLButtonElement>('[data-vote-btn]');

  for (const btn of buttons) {
    const v = btn.dataset.voteBtn as VoteColor;
    btn.classList.toggle('is-selected', vote === v);
  }

  if (vote) {
    applyCardHue(card, COLORS[vote]);
    if (resultEl) {
      const label = vote.charAt(0).toUpperCase() + vote.slice(1);
      resultEl.textContent = `You classified this as ${label}.`;
    }
    const opinionEl = card.querySelector<HTMLElement>('[data-our-opinion]');
    if (opinionEl) opinionEl.hidden = false;
  } else {
    applyCardHue(card, null);
    if (resultEl) resultEl.textContent = '';
    const opinionEl = card.querySelector<HTMLElement>('[data-our-opinion]');
    if (opinionEl) opinionEl.hidden = true;
  }
}

function updateStatus(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>('[data-vote-status]');
  if (!el) return;

  const total = root.querySelectorAll('[data-scenario-slug]').length;
  const voted = sessionVotes.size;

  if (voted === 0) {
    el.textContent =
      'Pick red, yellow, or green on each card — it will tint to show your classification. Votes are not saved.';
  } else if (voted < total) {
    el.textContent = `${voted} of ${total} classified. Keep going — cards colour as you vote.`;
  } else {
    el.textContent =
      'All three classified. Cards show how you coloured them. Reload the page to start over.';
  }
}

export function initAiVoting() {
  const root = document.getElementById('ai-vote-root');
  if (!root) return;

  const container = root;
  const cards = container.querySelectorAll<HTMLElement>('[data-scenario-slug]');

  function refresh() {
    for (const card of cards) {
      const slug = card.dataset.scenarioSlug!;
      updateCardUI(card, sessionVotes.get(slug));
    }
    updateStatus(container);
  }

  for (const card of cards) {
    const slug = card.dataset.scenarioSlug!;
    const buttons = card.querySelectorAll<HTMLButtonElement>('[data-vote-btn]');

    for (const btn of buttons) {
      btn.addEventListener('click', () => {
        const vote = btn.dataset.voteBtn as VoteColor;
        sessionVotes.set(slug, vote);
        refresh();
      });
    }
  }

  refresh();
}
