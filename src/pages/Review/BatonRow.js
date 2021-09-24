/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TableRow } from '@mui/material';
import { useApi } from '@vidispine/vdt-react';
import { bulkymetadata as BulkymetadataApi } from '@vidispine/vdt-api';

import BatonCell from './BatonCell';

const parseTestplan = ({ field = [] }, props) => ({
  ...props,
  ...(field.length && {
    ...field.reduce((a, { maps = {} }) => {
      const { map = [] } = maps;
      if (!map.length) return a;
      return map.reduce((b, { entry = [] }) => {
        if (!entry.length) return b;
        return entry.reduce((c, { key, value }) => {
          if (!key || !value) return c;
          const dataKey = key.slice(0, -1);
          return { ...c, [dataKey]: value };
        }, {});
      }, {});
    }, {}),
  }),
});

const BatonRow = ({ testplan, itemId, shapeId, columns, onHighlight }) => {
  const { name } = testplan;
  const onDownload = ({ filename }) => {
    return BulkymetadataApi.getShapeBulkyMetadata({
      itemId,
      shapeId,
      key: 'baton_report_files/as-file',
      queryParams: { extraMapValues: `filename=${filename}` },
      responseType: 'blob',
      headers: { accept: 'application/octet-stream' },
    })
      .then(({ data }) => URL.createObjectURL(data))
      .then((href) =>
        Object.assign(document.createElement('a'), { href, download: filename }).click(),
      );
  };

  const { request, data = {} } = useApi(BulkymetadataApi.getShapeBulkyMetadata);
  React.useEffect(() => {
    request({ itemId, shapeId, key: `baton_summary_${testplan.name}` });
  }, [itemId, request, shapeId, testplan]);
  const metadata = React.useMemo(() => parseTestplan(data, testplan), [data, testplan]);

  return (
    <TableRow>
      {columns.map(({ id, value, label, padding, type }) => (
        <BatonCell
          key={id}
          type={type}
          data={metadata}
          value={value}
          label={label}
          padding={padding}
          onHighlight={() => onHighlight({ testplan: name, shapeId, itemId })}
          onDownload={onDownload}
        />
      ))}
    </TableRow>
  );
};

export default BatonRow;
