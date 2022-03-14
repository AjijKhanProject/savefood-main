import {Dimensions, StyleSheet} from 'react-native';
const window = Dimensions.get('window');

const model = StyleSheet.create({
  view: {
    minWidth: window.width - 10,
    minHeight: window.height - 10,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    minWidth: window.width - 10,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  input: {
    width: 250,
    minHeight: 40,
    backgroundColor: '#fff',
  },
  largeButton: {
    width: 250,
    height: 40,
    margin: 10,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#DC7633',
    opacity: 0.8,
    margin: 5,
  },
  profile: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 65,
    margin: 5,
  },
  bage: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  Input: {
    color: 'black',
    marginLeft: 5,
    fontSize: 15,
    borderColor: '#F39C12',
    height: 40,
  },
  cartView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  loader: {
    width: 100,
    height: 100,
  },
});
export default model;
