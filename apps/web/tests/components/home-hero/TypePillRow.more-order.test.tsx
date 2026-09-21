// @vitest-environment jsdom
//
// Distilled Home scope: the Home type row keeps the presentation deck inline
// and the retained image-generation path behind 更多. Legacy artifact types
// remain readable in compatibility data but are not new-product entry points.

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TypePillRow } from '../../../src/components/home-hero/TypePillRow';
import {
  HOME_HERO_CHIPS,
  HOME_TYPE_ROW_IDS,
  HOME_TYPE_ROW_MORE_IDS,
  orderedCreateChips,
} from '../../../src/components/home-hero/chips';

afterEach(() => {
  cleanup();
});

const EXPECTED_MORE_ORDER = ['image'];

function renderRow() {
  const onPick = vi.fn();
  render(
    <TypePillRow
      chips={orderedCreateChips()}
      activeChipId={null}
      labelFor={(id) => id}
      onPick={onPick}
    />,
  );
  return { onPick };
}

describe('TypePillRow — 更多 (OPEND-3146)', () => {
  it('keeps the deck inline and the image path behind 更多', () => {
    expect([...HOME_TYPE_ROW_IDS]).toEqual(['deck']);
    expect([...HOME_TYPE_ROW_MORE_IDS]).toEqual(EXPECTED_MORE_ORDER);

    renderRow();
    for (const id of HOME_TYPE_ROW_IDS) {
      expect(screen.getByTestId(`home-hero-type-pill-${id}`)).toBeTruthy();
    }
    expect(screen.queryByTestId('home-hero-type-pills-popover')).toBeNull();

    fireEvent.click(screen.getByTestId('home-hero-type-pills-more'));
    const popover = screen.getByTestId('home-hero-type-pills-popover');
    const ids = Array.from(popover.querySelectorAll('button')).map((button) =>
      button.getAttribute('data-chip'),
    );
    expect(ids).toEqual(EXPECTED_MORE_ORDER);
  });

  it('covers every create type between the row and 更多 — nothing is retired', () => {
    const reachable = new Set([...HOME_TYPE_ROW_IDS, ...HOME_TYPE_ROW_MORE_IDS]);
    const createIds = orderedCreateChips().map((chip) => chip.id);
    expect(createIds.filter((id) => !reachable.has(id))).toEqual([]);
  });

  it('carries each create type once in the catalog — the fold must not read a stale duplicate', () => {
    const createIds = HOME_HERO_CHIPS.filter((chip) => chip.group === 'create').map((chip) => chip.id);
    const duplicates = createIds.filter((id, index) => createIds.indexOf(id) !== index);
    expect(duplicates).toEqual([]);
  });

  it('picks the retained image entry and closes the popover', () => {
    const { onPick } = renderRow();
    fireEvent.click(screen.getByTestId('home-hero-type-pills-more'));
    fireEvent.click(screen.getByTestId('home-hero-type-pill-image-more'));
    expect(onPick).toHaveBeenCalledWith(expect.objectContaining({ id: 'image' }));
    expect(screen.queryByTestId('home-hero-type-pills-popover')).toBeNull();
  });
});
