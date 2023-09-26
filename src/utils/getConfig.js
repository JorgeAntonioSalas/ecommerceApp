const getConfig = () => ({
 // resto_del_token  debe estar seguido de $ dentro de corchetes y luego reemplazado
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export default getConfig;

