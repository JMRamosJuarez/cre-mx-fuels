import React, { useCallback, useEffect, useState } from 'react';

import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import { ScrollView, Text } from 'react-native';

const module: CoreModule = new CoreModuleImpl();
const component: CoreComponent = new CoreComponentImpl(module);

const App: React.FC = () => {
  const [data, updateData] = useState<string>('LOADING');

  const getGasStations = useCallback(async () => {
    try {
      const { getGasStationsUseCase } = component.gasStationsComponent;
      const response = await getGasStationsUseCase.execute({
        distance: 5000,
        location: { lat: 24.7581614, lng: -107.4679059 },
      });
      const json = JSON.stringify(response, null, '\t');
      updateData(json);
    } catch (error) {
      const json = JSON.stringify(error, null, '\t');
      updateData(json);
    }
  }, []);

  useEffect(() => {
    getGasStations();
  }, [getGasStations]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ color: 'black', fontSize: 10 }}>{data}</Text>
    </ScrollView>
  );
};

export default App;
