import React, { useContext } from 'react';
import styled from 'styled-components';
import BulletedList from '@bbc/psammead-bulleted-list';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { arrayOf, shape, oneOf } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';
import { MediumGridWithMargin } from '#app/components/Grid';

const componentsToRender = { listItem };

const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const BulletedListContainer = ({ blocks }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <MediumGridWithMargin>
      <Wrapper>
        <BulletedList script={script} service={service} dir={dir}>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </BulletedList>
      </Wrapper>
    </MediumGridWithMargin>
  );
};

export const ListPropTypes = {
  blocks: arrayOf(
    shape({ type: oneOf(['listItem']), model: shape(ListItemPropTypes) }),
  ).isRequired,
};

BulletedListContainer.propTypes = { ...ListPropTypes };

export default BulletedListContainer;
