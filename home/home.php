<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    
    <title>organizza casa</title>
</head>
<body>
    
    <?php
            $prenotazioni = [[], []];

            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $query = "SELECT * FROM prenotazioni";
            $result = $log_DB->query($query);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $prenotazioni[0][] = $row['nome'];
                    $prenotazioni[1][] = $row['stanza'];
                }
            }
            $log_DB->close();


            $pranzoIN = "...";
            $cenaIN = "...";

            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $query = "SELECT * FROM pasti";
            $result = $log_DB->query($query);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $pranzoIN = $row['pranzo'];
                $cenaIN = $row['cena'];
            }

            $log_DB->close();

            session_start();
            if(isset( $_SESSION['username'])){
                $nome = $_SESSION['username'];
            }
            
            



            if(isset($_POST['form_type'])){
                $log_DB = new mysqli("localhost", "root", "", "sito_home");

                $nome = $_POST['name'];
                $pas = $_POST['password'];
                $query = "INSERT INTO user(nome, password) VALUES ('$nome', '$pas') ";

                $risultato = $log_DB->query($query);
                $log_DB->close();
            }
            if(isset($_POST["stanza"])){
                $stanza = $_POST["stanza"];
                $nome = $_POST['name'];
                $log_DB = new mysqli("localhost", "root", "", "sito_home");
                $sql = "INSERT INTO prenotazioni(nome, stanza) VALUES ('$nome', '$stanza')";
                $risultato = $log_DB->query($sql);
                $log_DB->close();
            }
            if(isset($_POST["DelStan"])){
                $stanza = $_POST["DelStan"];
                $log_DB = new mysqli("localhost", "root", "", "sito_home");
                $sql = "DELETE FROM prenotazioni WHERE stanza = '$stanza'";
                $risultato = $log_DB->query($sql);
                echo $risultato;
                $log_DB->close();
            }
            if(isset($_POST["pranzo"])){
                $pranzo = $_POST["pranzo"];
                $log_DB = new mysqli("localhost", "root", "", "sito_home");
                $sql = "UPDATE pasti SET pranzo = '$pranzo'";
                $risultato = $log_DB->query($sql);
                $log_DB->close();
            }
            if(isset($_POST["cena"])){
                $cena = $_POST["cena"];
                $log_DB = new mysqli("localhost", "root", "", "sito_home");
                $sql = "UPDATE pasti SET cena = '$cena'";
                $risultato = $log_DB->query($sql);
                $log_DB->close();
            }
            if(isset($_POST["spesa"])){
                $spesa = $_POST["spesa"];
                $log_DB = new mysqli("localhost", "root", "", "sito_home");
                $sql = "INSERT INTO spesa(lista) VALUES ('$spesa')";
                $risultato = $log_DB->query($sql);
                $log_DB->close();
            }

        $log_DB = new mysqli("localhost", "root", "", "sito_home");

        $sql = "SELECT lista FROM spesa";
        $risultato = $log_DB->query($sql);

        $listaSpesa = "";
        if ($risultato->num_rows > 0) {
            while ($row = $risultato->fetch_assoc()) {
                $listaSpesa .=$row["lista"]."<br>";
            }  
        }
        $log_DB->close();

        if(isset($_POST["favori"])){
            $favori = $_POST["favori"];
            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $sql = "INSERT INTO favori(persone, lista) VALUES ('','$favori')";
            $risultato = $log_DB->query($sql);
            $log_DB->close();
        } 
        
        $log_DB = new mysqli("localhost", "root", "", "sito_home");

        $sql = "SELECT * FROM favori";
        $risultato = $log_DB->query($sql);

        $listaFavori = "";
        $listaPersone = "";
        $i = 0;
        if ($risultato->num_rows > 0) {
            while ($row = $risultato->fetch_assoc()) {
                $listaPersone .= "<h2 id=\"$row[lista]\">" . $row["persone"] . "</h2>";
                $listaFavori .= "<h2 onClick=\"gestisciFav('$row[lista]')\" id=\"$row[lista]\">" . $row["lista"] . "</h2>";
            }
        }
        $log_DB->close();

        if(isset($_POST["chiamafunzione"])){
            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $sql = "DELETE FROM spesa";
            $risultato = $log_DB->query($sql);
            $log_DB->close();
        }


        if(isset($_POST["Nfavori"])){
            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $sql = "UPDATE favori SET persone = '$nome' WHERE lista = '$_POST[Nfavori]';";
            $result = $log_DB->query($sql);
            $log_DB->close();
        }

        if(isset($_POST["Dfavori"])){
            $log_DB = new mysqli("localhost", "root", "", "sito_home");
            $sql = "DELETE FROM favori WHERE lista = '$_POST[Dfavori]'";
            $result = $log_DB->query($sql);
            $log_DB->close();
        }

    ?>
    <script>
        const nome = "<?php echo $nome;?>";
        const stanze_prenotate = [[<?php echo json_encode($prenotazioni[0]); ?>], [<?php echo json_encode($prenotazioni[1]); ?>]];
        let pranzoIN = "<?php echo $pranzoIN;?>"
        let cenaIN = "<?php echo $cenaIN;?>"
    </script>
    <header>
        <h2><a href="#prenota">prenota</a></h2>
        <h2><a href="#cibo">cosa si mangierà oggi</a></h2>
        <h2><a href="#favori">favori</a></h2>
        <h2 class="user"><a href="../login/signUp.html">user: <?php echo $nome?></a></h2>
    </header>
    <main class="prenota" id="prenota">
        <h1>PRENOTA</h1>
        
        <div class="sala" onclick="prenota('sala')"  ><h3>sala: ...</h3><button id="btnX">X</button></div>
        <div class="cucina" onclick="prenota('cucina')"><h3>cucina: ...</h3></div>
        <div class="studio" onclick="prenota('studio')"><h3>studio: ...</h3></div>
        <div class="bagno1" onclick="prenota('bagno1')"><h3>bagno 1: ...</h3></div>
        <div class="bagno2" onclick="prenota('bagno2')"><h3>bagno 2: ...</h3></div>
        
    </main>
    <main class="cibo" id="cibo">
        <h1>cosa si mangierà oggi?</h1>

        <div class="table">
            <div class="pranzo">
                <h1>pranzo</h1>
                <h2>Descrizione piatto:</h2>
                <h3><?php echo $pranzoIN; ?></h3>
                <input type="text" style="display: none">
                <button onclick="change('pranzo')">change</button>
                <div class="comm">
                    <button class="like">&#128077</button>
                    <button class="dislike">&#128078</button>
                </div>
            </div>
            <div class="linea"></div>
            <div class="cena">
                <h1>cena</h1>
                <h2>Descrizione piatto:</h2>
                <h3><?php echo $cenaIN; ?></h3>
                <input type="text" style="display: none">
                <button onclick="change('cena')">change</button>
                <div class="comm">
                    <button class="like">&#128077</button>
                    <button class="dislike">&#128078</button>
                </div>
            </div>
            <div class="linea"></div>
            <div class="spesa">
                
                <h1>spesa</h1>
                <h2>elenco:</h2>
                <h3><?php echo $listaSpesa; ?></h3>
                <h3></h3>
                <div class="holder"></div>
                <input type="text" style="display: none">
                <div>
                    <button onclick="change('spesa')">add</button>
                    <button type="submit" name="chiamafunzione" onclick="ell()" class="red">X</button>
                </div>
            </div>
        </div>
    </main>
<main class="favori" id="favori">
    <div class="left-section">
        <h1>Persone prenotate:</h1>
        <?php echo $listaPersone; ?>
        
        <div class="holderrr"></div>
        <h2 id="vuotov"></h2>
    </div>
    <div class="right-section">
        <h1>Favori in corso:</h1>
        <?php echo $listaFavori; ?>

        <div class="holderr"><h2></h2></div>
        
        <input id="inpF" type="text" style="display: none">
        <div class="btn">
            <button onclick="favori()">richiedi favori</button>
        </div>
    </div>
</main>

    <script src="script.js"></script>
</body>
</html>