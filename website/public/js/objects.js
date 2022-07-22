
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components(){
    console.log("Chargement des données de la page");
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    $('h1').text('Gestion de trucs machins choses');
    $('.brand-text').text('Pas IoT, Pas Chambéry');

   // $.get("http://localhost:5000/objects");
    $.get("http://api-node.cicada.rocks/objects", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
        data.objects.forEach(o => {
            console.log(o.serial);
            $.get("http://api-node.cicada.rocks/object/full/" + o.serial, function(obj, status){
                alert("Data: " + obj + "\nStatus: " + status);
                add_ligne_table(obj);
            });

        });
    });

}
$(document).ready(function(){
    load_components();
});

function add_ligne_table(data){
    let row = $('<tr>');

    let serial = $('<td>');
    serial.text(data.serial);
    row.append(serial);

    let path = data.image;
    if(path === undefined){
        path = data.default_image;
    }
    let imageTD = $('<td>');
    let image = $('<img>');
    image.attr('src', '/images/'+path);
    image.attr('width',300);
    imageTD.append(image);
    row.append(imageTD);

    let descriptionTD = $('<td>');
    let description = $('<textarea>');
    description.text(data.description);
    description.css('width', 800);
    description.css('height', 200);
    descriptionTD.append(description)
    row.append(descriptionTD);

    let statusTD = $('<td>');
    let status = $('<input>');
    status.attr('type','checkbox');
    status.attr('checked',data.status);
    statusTD.append(status)
    row.append(statusTD);

    let actionTD = $('<td>');
    let action = $('<button>');
    action.attr('class', 'action');
    action.text('Plus de details');
    actionTD.append(action)
    row.append(actionTD);

    $('#table_body').append(row);
}
