<?php 
$files_name = $_FILES['file']['name']; //getting files name
$tmp_name = $_FILES['file']['tmp_name']; // getting temp_name of file
$files_up_name = time().$file_name; // making file name dynamic by adding before file name.
move_uploaded_file($tmp_name, "files/".$file_up_name); // moving files to the specified folder with dynamic name 
?>