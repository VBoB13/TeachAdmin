document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll("input").forEach(function(input){
        if (input.getAttribute("type") != "submit"){
            input.classList.add("form-control");
        }
    });
    document.querySelectorAll('select').forEach(function(select){
        select.classList.add("form-control");
    });
});