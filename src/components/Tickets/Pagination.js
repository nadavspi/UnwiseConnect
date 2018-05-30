import Pagify from 'react-pagify';
import React from 'react';
import pagifyBootstrapPreset from 'react-pagify-preset-bootstrap';
import segmentize from 'segmentize';
import cloneDeep from 'lodash.clonedeep';

const Pagination = ({ changePage, pagination, paginated, topHtmlId }) => {
  let preset = cloneDeep(pagifyBootstrapPreset);
  preset.tags.link.props.href = topHtmlId ? '#' + topHtmlId : '#';

  return (
    <Pagify.Context
      {...preset}
      onSelect={changePage}
      segments={segmentize({
        page: pagination.page,
        pages: paginated.amount,
        beginPages: 3,
        endPages: 3,
        sidePages: 2,
      })}
    >
    <Pagify.Button page={pagination.page - 1}>Previous</Pagify.Button>
    <Pagify.Segment field="beginPages" />
    <Pagify.Ellipsis
      className="ellipsis"
      previousField="beginPages"
      nextField="previousPages"
    />
    <Pagify.Segment field="previousPages" />
    <Pagify.Segment field="centerPage" className="active" />
    <Pagify.Segment field="nextPages" />
    <Pagify.Ellipsis
      className="ellipsis"
      previousField="nextPages"
      nextField="endPages"
    />
    <Pagify.Segment field="endPages" />
    <Pagify.Button page={pagination.page + 1}>Next</Pagify.Button>
  </Pagify.Context>
  );
};

export default Pagination;
