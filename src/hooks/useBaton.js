import React from 'react';
import { useQueries } from 'react-query';
import { bulkymetadata as BulkymetadataApi } from '@vidispine/vdt-api';

const BATON_KEY = 'baton_report_files';

const getBatonReport = ({ itemId, shapeId, tag }) =>
  BulkymetadataApi.getShapeBulkyMetadata({ itemId, shapeId, key: BATON_KEY })
    .then(({ data = {} }) => {
      const { field = [] } = data;
      if (!field.length) return false;
      const testplans = field
        .reduce((acc, { maps }) => [...acc, ...maps.map], [])
        .map(({ entry }) => entry.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}))
        .reduce((acc, { 'test-plan': testplan, created, ...rest }) => {
          const index = acc.findIndex(({ name }) => name === testplan);
          if (index < 0) return [...acc, { name: testplan, created, files: [{ ...rest }] }];
          acc[index].files.push({ ...rest });
          return acc;
        }, []);
      return { itemId, shapeId, tag, testplans };
    })
    .catch(() => false);

export default function useBaton(itemType) {
  const { shape = [], id: itemId } = itemType;
  const queries = useQueries(
    shape.map(({ id: shapeId, tag }) => ({
      queryKey: ['baton', itemId, shapeId],
      queryFn: () => getBatonReport({ itemId, shapeId, tag }),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    })),
  );
  const isLoading = queries.some(({ isLoading: loading }) => loading);
  const [hasQc, reports] = React.useMemo(() => {
    const filter = queries.filter(({ data }) => !!data);
    return [filter.length > 0, filter.map(({ data }) => data)];
  }, [queries]);
  return { isLoading, hasQc, reports };
}
