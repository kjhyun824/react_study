/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import JHPractice from './dist';

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<JHPractice />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default App;
