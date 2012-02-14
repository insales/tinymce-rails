
function toggleUploadImageForm(){
    $("#image_upload_container").toggle();
}

function uploadImage(){
    $("#image_upload_container .error").empty();
    $(".uploading").toggle();
    $("#uploadForm").ajaxSubmit({
        dataType: 'json',
        success: function(response) {
            $(".uploading").toggle();
            if (response.status == 'ok') showImage(response.file);
            else showError(response.errors);
            
        }
    });
}

function showImage(image){
    $("#image_upload_container .error").empty();
    if (!$(".properties #src_list").attr("id")) parseSrcList();
    var option = "<option value='"+image.url.split("?")[0]+"' selected='selected'>"+image.file_name+"</option>";
    $("#src_list option").removeAttr("selected");
    $("#src_list").append(option);
    $("#src_list").trigger('change');
    toggleUploadImageForm();
}

function showError(errors){
    var error_messages = "";
    $.each( errors, function(obj, msg){
        error_messages += msg+"<br/>";
    });
    $("#image_upload_container .error").html(error_messages);
}

function parseSrcList(){
    var src_list = $("#src_list_container tr").html();
    $("<tr>"+src_list+"</tr>").insertAfter(".properties tr:first");
}