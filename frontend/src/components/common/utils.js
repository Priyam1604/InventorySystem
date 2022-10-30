import apiClient from "../../request"

const logout = async(user,redirect) => {
    console.log(user);
    const {ok} = await apiClient.delete('login/',{user})
    if(ok){
        redirect('/')
    }
} 


const handleChange = (event,state,onChange) => {
    
    const {value,name } = event
    const latestValue = {...state}
    latestValue[name] = value
    onChange(latestValue)
}





export {logout,handleChange};