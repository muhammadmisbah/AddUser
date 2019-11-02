import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function reset(index, actions) {
    _navigator.dispatch(
        StackActions.reset({
            index,
            actions
        })
    );
}

export default {
    navigate,
    reset,
    setTopLevelNavigator,
};