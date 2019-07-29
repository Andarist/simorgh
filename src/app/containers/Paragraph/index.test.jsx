import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
import ParagraphContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const inlineLinkBlock = (text, locator, blocks, isExternal) => ({
  type: 'urlLink',
  model: {
    text,
    locator,
    blocks,
    isExternal,
  },
});

const inlineSpanBlock = (blocks, language, text) => ({
  model: {
    blocks,
    language,
    text,
  },
  type: 'inline',
});

const persianText = 'چیسربرگر';
const persianLink = inlineLinkBlock(
  persianText,
  'https://google.com',
  [fragmentBlock(persianText)],
  true,
);

const inlinePersianBlock = inlineSpanBlock([persianLink], 'fa', persianText);

const inlineLink = inlineLinkBlock(
  'a link',
  '/bbc-test',
  [
    fragmentBlock('Some text'),
    fragmentBlock(' for the ', ['bold']),
    fragmentBlock(' link!', ['italic']),
  ],
  false,
);

const blocksMock = [fragmentBlock('This is some text.', ['bold']), inlineLink];

const blocksWithInline = [
  fragmentBlock('This is some text.', ['bold']),
  inlinePersianBlock,
];

const ParagraphContainerWithContext = blocks => (
  <ServiceContext.Provider value={{ script: latin }}>
    <ParagraphContainer blocks={blocks} />
  </ServiceContext.Provider>
);

describe('ParagraphContainer', () => {
  shouldMatchSnapshot(
    'should render correctly',
    ParagraphContainerWithContext(blocksMock),
  );

  shouldMatchSnapshot(
    'should render correctly with inline block',
    ParagraphContainerWithContext(blocksWithInline),
  );
});
