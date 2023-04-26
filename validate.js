function handler(){
    let x = document.forms["login"]["name"].value;
    let y = document.forms["login"]["room"].value;
    if(x=='' || y==''){
        alert("PLease enter name and room")
        return false
    }
}