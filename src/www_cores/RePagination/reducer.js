/**
 * Created by Tester-Ali on 17-11-2016.
 */
export default (state = {}, action) => {
    const {response} = action;
    if(response && response.metadata){
        return response.metadata;
    }
    return state;
}