import React from 'react';
import { useQuery } from 'react-query';
import {
  analyzepreset as PresetApi,
  shape as ShapeApi,
  vidinet as VidinetApi,
} from '@vidispine/vdt-api';

const PresetContext = React.createContext();

export function useListPresets() {
  return useQuery(
    ['preset'],
    () =>
      PresetApi.listAnalyzePreset().then(({ data = {} }) => {
        const { preset = [] } = data;
        return preset.map(({ name }) => name);
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

export function useGetPreset({ preset, itemId, shapeId, resourceId }) {
  return useQuery(
    ['preset', preset, itemId, shapeId],
    () =>
      new Promise((resolve, reject) => {
        ShapeApi.createShapeAnalyze({
          itemId,
          shapeId,
          queryParams: { resourceId, preset },
          costEstimate: true,
          analyzeJobDocument: {},
        })
          .then(({ data: { id: costEstimateId } = {} }) => {
            const poll = () =>
              VidinetApi.getCostEstimate({ costEstimateId })
                .then(({ data }) => {
                  const { state, service = [{}] } = data;
                  if (state !== 'FINISHED') setTimeout(poll, 1000);
                  else {
                    const [{ cost: { value = 0 } = {} }] = service;
                    resolve(value);
                  }
                })
                .catch(reject);
            poll();
          })
          .catch(reject);
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  );
}

export const PresetProvider = ({ children }) => {
  const { data = [], isLoading, isError } = useListPresets();
  const [search, setSearch] = React.useState('');
  const onSearch = (v) => setSearch(v);
  const presets = React.useMemo(() => {
    if (search) return data.filter((preset) => preset.toLowerCase().includes(search.toLowerCase()));
    return data;
  }, [search, data]);
  return (
    <PresetContext.Provider value={{ presets, onSearch, isLoading, isError }}>
      {children}
    </PresetContext.Provider>
  );
};

export function usePresets() {
  const context = React.useContext(PresetContext);
  if (context === undefined) {
    throw new Error('usePreset must be used within a PresetProvider');
  }
  return context;
}
