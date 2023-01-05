async function getData(uId){
    const p=new Promise(resolve => {
        setTimeout(() => {
            console.log("Fetched the data!");
            return resolve("skc@gmail.com");
        }, 4000);
    });
    return p;
}
const fetchEmail=async() => {
    const email=await getData("skc");
    console.log("Email id of the user id is:"+email);
    console.log("end");
}
console.log("start");
fetchEmail();