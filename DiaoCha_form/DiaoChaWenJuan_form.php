<?php
/**
 * Created by PhpStorm.
 * User: asus
 * Date: 2019/3/14
 * Time: 16:09
 */
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>结果</title>
    <style type="text/css">
        h3{
            color: pink;
            text-align: center;
        }
    </style>
</head>
<body>
<?php

try{
    $pdo = new PDO("mysql:host=localhost;dbname=mydiaochawenti","root","123456");
    $pdo->query("set names utf8");

    //解除限制
    $sql_jieShuXianZhi = "set sql_safe_updates = 0;";
    $pdo->query($sql_jieShuXianZhi);


    //更新num
    function select($pdo,$id,$select){

        $sql = "select daAn,num from daAn where wenti_id = $id";

        $result = $pdo->prepare($sql);
        $result->execute();
        $res = $result->fetchAll(PDO::FETCH_ASSOC);
        $count = count($res);

        if($id!=9){

            for($i=0; $i<$count; ++$i){

                if($res[$i]['daAn']===$select){

                    $num = $res[$i]['num'];

                    ++$num;
                    $daAn = $res[$i]['daAn'];

                    $sql = "update daAn set num = $num where daAn='$daAn'";
                    $pdo->query($sql);
                    $result = $pdo->prepare($sql);
                    $result->execute();

                }
            }
        }else{

            $text1=$_GET['select9'];

            for($i=0;$i<count($text1);$i++) {

                $yourwant = $text1[$i];

                for($j=0; $j<$count; ++$j){

                    if($res[$j]['daAn']===$yourwant){
                        $num = $res[$j]['num'];
                        ++$num;
                        $daAn = $res[$j]['daAn'];

                        $sql = "update daAn set num = $num where daAn='$daAn'";

                        $result = $pdo->prepare($sql);
                        $result->execute();
                    }
                }

            }

        }


    }

    if(isset($_GET['select1'])){

        select($pdo,1,$_GET['select1']);
    }


    if(isset($_GET['select2'])){

        select($pdo,2,$_GET['select2']);

    }

    if(isset($_GET['select3'])){

        select($pdo,3,$_GET['select3']);

    }

    if(isset($_GET['select4'])){

        select($pdo,4,$_GET['select4']);

    }

    if(isset($_GET['select5'])){

        select($pdo,5,$_GET['select5']);

    }

    if(isset($_GET['select6'])){

        select($pdo,6,$_GET['select6']);

    }

    if(isset($_GET['select7'])){

        select($pdo,7,$_GET['select7']);

    }

    if(isset($_GET['select8'])){

        select($pdo,8,$_GET['select8']);

    }

    if(isset($_GET['select9'])){

        select($pdo,9,$_GET['select9']);
    }

    if(isset($_GET['select10'])){

        select($pdo,10,$_GET['select10']);

    }

    //恢复限制
    $sql_jieShuXianZhi = "set sql_safe_updates = 1;";
    $pdo->query($sql_jieShuXianZhi);


    //断开连接
    $result=null;
    $pdo=null;



}catch(Exception $e){
    echo $e->getMessage()."<br/>";
}

?>

<h3>感谢您的回答！祝您生活愉快！万事如意！</h3>
</body>
</html>



