<?php
    require("Toro.php");
    
    class UsuariosHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM usuarios WHERE userId = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM usuarios");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $userId = $_PUT['userId'];
                $password = $_PUT['password'];
                $nombre = $_PUT['nombre'];
                $correo = $_PUT['correo'];
                $pais = $_PUT['pais'];
                $edad = $_PUT['edad'];
                $genero = $_PUT['genero'];
                $rol = $_PUT['rol'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO usuarios (userId,password,nombre,correo,pais,edad,genero,rol)
                                                VALUES (:userId,:password,:nombre,:correo,:pais,:edad,:genero,:rol)");
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':correo', $correo);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':edad', $edad);
                $stmt->bindParam(':genero', $genero);
                $stmt->bindParam(':rol', $rol);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM usuarios WHERE userId = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function posttest($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                $nombre = $_POST['nombre'];
                $password = $_POST['password'];
                $correo = $_POST['correo'];
                $pais = $_POST['pais'];
                $edad = $_POST['edad'];
                $genero = $_POST['genero'];
                $rol = $_POST['rol'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE usuarios SET nombre=:nombre, password=:password, correo=:correo, pais=:pais, edad=:edad, genero=:genero, rol=:rol WHERE userId = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':correo', $correo);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':edad', $edad);
                $stmt->bindParam(':genero', $genero);
                $stmt->bindParam(':rol', $rol);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function postrole($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                $rol = $_POST['rol'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE usuarios SET rol=:rol WHERE userId = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':rol', $rol);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='posttest')
                    return $this->posttest($id);
                else if ($_POST['method']=='postrole')
                    return $this->postrole($id);
                $password = $_POST['password'];
                $nombre = $_POST['nombre'];
                $correo = $_POST['correo'];
                $pais = $_POST['pais'];
                $edad = $_POST['edad'];
                $genero = $_POST['genero'];
                $rol = $_POST['rol'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE usuarios SET password=:password, nombre=:nombre, correo=:correo
                                        pais=:pais, edad=:edad, genero=:genero, rol=:rol WHERE userId = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':correo', $correo);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':edad', $edad);
                $stmt->bindParam(':genero', $genero);
                $stmt->bindParam(':rol', $rol);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

    }//Fin de clase

    class AgenciasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM agencias WHERE idAgencia = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM agencias");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $nombre = $_PUT['nombre'];
                $pais = $_PUT['pais'];
                $especialidad = $_PUT['especialidad'];
                $telefono = $_PUT['telefono'];
                $correo = $_PUT['correo'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO agencias (nombre,pais,especialidad,telefono,correo)
                                                VALUES (:nombre,:pais,:especialidad,:telefono,:correo)");
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':especialidad', $especialidad);
                $stmt->bindParam(':telefono', $telefono);
                $stmt->bindParam(':correo', $correo);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM agencias WHERE idAgencia = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                $nombre = $_POST['nombre'];
                $pais = $_POST['pais'];
                $especialidad = $_POST['especialidad'];
                $telefono = $_POST['telefono'];
                $correo = $_POST['correo'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE agencias SET nombre=:nombre,
                                        pais=:pais, especialidad=:especialidad,
                                        telefono=:telefono, correo=:correo WHERE idAgencia = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':especialidad', $especialidad);
                $stmt->bindParam(':telefono', $telefono);
                $stmt->bindParam(':correo', $correo);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class BoletinesHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM boletines WHERE idBoletin = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM boletines");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $fecha = $_PUT['fecha'];
                $numero = $_PUT['numero'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO boletines (fecha, numero)
                                                VALUES (:fecha, :numero)");
                $stmt->bindParam(':fecha', $fecha);
                $stmt->bindParam(':numero', $numero);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM boletines WHERE idBoletin = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else{
                    $fecha = $_POST['fecha'];
                    $numero = $_POST['numero'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE boletines SET fecha=:fecha, numero=:numero WHERE idBoletin = :id");
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':fecha', $fecha);
                    $stmt->bindParam(':numero', $numero);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class PeriodistasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM periodistas WHERE idPeriodista = :id");
                    $stmt = $dbh->prepare("SELECT idPeriodista, telefono, ciudad, usuario, nombre FROM periodistas, usuarios 
                                            WHERE periodistas.usuario = usuarios.userId AND idPeriodista = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    //$stmt = $dbh->prepare("SELECT * FROM periodistas");
                    $stmt = $dbh->prepare("SELECT idPeriodista, telefono, ciudad, usuario, nombre FROM periodistas, usuarios 
                                            WHERE periodistas.usuario = usuarios.userId");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);                
                $telefono = $_PUT['telefono'];
                $ciudad = $_PUT['ciudad'];
                $usuario = $_PUT['usuario'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO periodistas (telefono,ciudad,usuario)
                                                VALUES (:telefono,:ciudad,:usuario)");
                $stmt->bindParam(':telefono', $telefono);
                $stmt->bindParam(':ciudad', $ciudad);
                $stmt->bindParam(':usuario', $usuario);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM periodistas WHERE idPeriodista = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                $telefono = $_POST['telefono'];
                $ciudad = $_POST['ciudad'];
                $usuario = $_POST['usuario'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE periodistas SET telefono=:telefono,
                                        ciudad=:ciudad, usuario=:usuario WHERE idPeriodista = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':telefono', $telefono);
                $stmt->bindParam(':ciudad', $ciudad);
                $stmt->bindParam(':usuario', $usuario);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class CategoriasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                /*if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM categorias WHERE idCategoria = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM categorias");
                }*/
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT a.idCategoria, a.nombre, a.zona, a.encargado, b.nombre as encargadoNom FROM categorias a, usuarios b, periodistas 
                                            WHERE a.encargado = periodistas.idPeriodista AND periodistas.usuario = b.userId AND a.idCategoria = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT a.idCategoria, a.nombre, a.zona, a.encargado, b.nombre as encargadoNom FROM categorias a, usuarios b, periodistas 
                    WHERE a.encargado = periodistas.idPeriodista AND periodistas.usuario = b.userId");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);                
                $nombre = $_PUT['nombre'];
                $zona = $_PUT['zona'];
                $encargado = $_PUT['encargado'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO categorias (nombre,zona,encargado)
                                                VALUES (:nombre,:zona,:encargado)");
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':zona', $zona);
                $stmt->bindParam(':encargado', $encargado);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM categorias WHERE idCategoria = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else{
                    $nombre = $_POST['nombre'];
                    $zona = $_POST['zona'];
                    $encargado = $_POST['encargado'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE categorias SET nombre=:nombre,
                                            zona=:zona, encargado=:encargado WHERE idCategoria = :id");
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':nombre', $nombre);
                    $stmt->bindParam(':zona', $zona);
                    $stmt->bindParam(':encargado', $encargado);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class NoticiasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM noticias WHERE idNoticia = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM noticias");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function search($id=null) {
            $dbh = $this->init();
            try {
                $term = "%".$_POST['term']."%";
                $stmt = $dbh->prepare("SELECT * FROM noticias WHERE cuerpo LIKE :term OR titulo LIKE :term");
                $stmt->bindValue(':term', $term, PDO::PARAM_STR);
                $stmt->execute();               
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function getByBoletin($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM noticias WHERE boletin = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM noticias");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function getLast($id=null) {
            $dbh = $this->init();
            try {
                $stmt = $dbh->prepare("SELECT * FROM  noticias ORDER BY idNoticia DESC LIMIT 1");
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function getLatest($id=null) {
            $dbh = $this->init();
            try {
                $stmt = $dbh->prepare("SELECT * FROM  noticias ORDER BY idNoticia DESC LIMIT 10");
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $fecha = $_PUT['fecha'];
                $lugar = $_PUT['lugar'];
                $titulo = $_PUT['titulo'];
                $cuerpo = $_PUT['cuerpo'];
                $periodista = $_PUT['periodista'];
                $agencia = $_PUT['agencia'];
                $boletin = $_PUT['boletin'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO noticias (fecha,lugar,titulo,cuerpo,periodista,agencia,boletin)
                                                VALUES (:fecha,:lugar,:titulo,:cuerpo,:periodista,:agencia,:boletin)");
                $stmt->bindParam(':fecha', $fecha);
                $stmt->bindParam(':lugar', $lugar);
                $stmt->bindParam(':titulo', $titulo);
                $stmt->bindParam(':cuerpo', $cuerpo);
                $stmt->bindParam(':periodista', $periodista);
                $stmt->bindParam(':agencia', $agencia);
                $stmt->bindParam(':boletin', $boletin);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();                
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM noticias WHERE idNoticia = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='getLast')
                    return $this->getLast($id);
                else if ($_POST['method']=='getLatest')
                    return $this->getLatest($id);
                else if ($_POST['method']=='getByBoletin')
                    return $this->getByBoletin($id);
                else if ($_POST['method']=='search')
                    return $this->search($id);
                else{
                    $fecha = $_POST['fecha'];
                    $lugar = $_POST['lugar'];
                    $titulo = $_POST['titulo'];
                    $cuerpo = $_POST['cuerpo'];
                    $periodista = $_POST['periodista'];
                    $agencia = $_POST['agencia'];
                    $boletin = $_POST['boletin'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE noticias SET fecha=:fecha, lugar=:lugar, titulo=:titulo, cuerpo=:cuerpo,
                                            periodista=:periodista, agencia=:agencia, boletin=:boletin WHERE idNoticia = :id");
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':fecha', $fecha);
                    $stmt->bindParam(':lugar', $lugar);
                    $stmt->bindParam(':titulo', $titulo);
                    $stmt->bindParam(':cuerpo', $cuerpo);
                    $stmt->bindParam(':periodista', $periodista);
                    $stmt->bindParam(':agencia', $agencia);
                    $stmt->bindParam(':boletin', $boletin);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class ClasificadasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if(isset($_GET['noticia']) && isset($_GET['categoria'])){
                    $noticia = $_GET['noticia'];
                    $categoria = $_GET['categoria'];
                    $stmt = $dbh->prepare("SELECT * FROM clasificadas WHERE noticia = :noticia AND categoria = :categoria");
                    $stmt->bindParam(':noticia', $noticia);
                    $stmt->bindParam(':categoria', $categoria);
                }else if(isset($_GET['noticia'])){
                    $noticia = $_GET['noticia'];
                    $stmt = $dbh->prepare("SELECT * FROM clasificadas WHERE noticia = :noticia");
                    $stmt->bindParam(':noticia', $noticia);
                }
                else if(isset($_GET['categoria'])){
                    $categoria = $_GET['categoria'];
                    $stmt = $dbh->prepare("SELECT * FROM clasificadas WHERE categoria = :categoria");
                    $stmt->bindParam(':categoria', $categoria);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM clasificadas");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);                
                $noticia = $_PUT['noticia'];
                $categoria = $_PUT['categoria'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO clasificadas (noticia,categoria)
                                                VALUES (:noticia,:categoria)");
                $stmt->bindParam(':noticia', $noticia);
                $stmt->bindParam(':categoria', $categoria);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $_DELETE=json_decode(file_get_contents('php://input'), True);
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM clasificadas WHERE noticia = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else{
                    $noticia = $_POST['noticia'];
                    $categoria = $_POST['categoria'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE clasificadas SET noticia=:noticia, categoria =:categoria
                                            WHERE noticia = :noticia AND categoria = :categoria");
                    $stmt->bindParam(':noticia', $noticia);
                    $stmt->bindParam(':categoria', $categoria);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class PreferidasHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if(isset($_GET['usuario']) && isset($_GET['categoria'])){
                    $usuario = $_GET['usuario'];
                    $categoria = $_GET['categoria'];
                    $stmt = $dbh->prepare("SELECT * FROM preferidas WHERE usuario = :usuario AND categoria = :categoria");
                    $stmt->bindParam(':usuario', $usuario);
                    $stmt->bindParam(':categoria', $categoria);
                }else if(isset($_GET['usuario'])){
                    $usuario = $_GET['usuario'];
                    $stmt = $dbh->prepare("SELECT * FROM preferidas WHERE usuario = :usuario");
                    $stmt->bindParam(':usuario', $usuario);
                }
                else if(isset($_GET['categoria'])){
                    $categoria = $_GET['categoria'];
                    $stmt = $dbh->prepare("SELECT * FROM preferidas WHERE categoria = :categoria");
                    $stmt->bindParam(':categoria', $categoria);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM preferidas");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);                
                $usuario = $_PUT['usuario'];
                $categoria = $_PUT['categoria'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO preferidas (usuario,categoria)
                                                VALUES (:usuario,:categoria)");
                $stmt->bindParam(':usuario', $usuario);
                $stmt->bindParam(':categoria', $categoria);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $_DELETE=json_decode(file_get_contents('php://input'), True);
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM preferidas WHERE usuario = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else{
                    $usuario = $_POST['usuario'];
                    $categoria = $_POST['categoria'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE preferidas SET usuario=:usuario, categoria =:categoria
                                            WHERE usuario = :usuario AND categoria = :categoria");
                    $stmt->bindParam(':usuario', $usuario);
                    $stmt->bindParam(':categoria', $categoria);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class VistosHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:proyecto2.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if(isset($_GET['usuario']) && isset($_GET['boletin'])){
                    $usuario = $_GET['usuario'];
                    $boletin = $_GET['boletin'];
                    $stmt = $dbh->prepare("SELECT * FROM vistos WHERE usuario = :usuario AND boletin = :boletin");
                    $stmt->bindParam(':usuario', $usuario);
                    $stmt->bindParam(':boletin', $boletin);
                }else if(isset($_GET['usuario'])){
                    $usuario = $_GET['usuario'];
                    $stmt = $dbh->prepare("SELECT * FROM vistos WHERE usuario = :usuario");
                    $stmt->bindParam(':usuario', $usuario);
                }
                else if(isset($_GET['boletin'])){
                    $boletin = $_GET['boletin'];
                    $stmt = $dbh->prepare("SELECT * FROM vistos WHERE boletin = :boletin");
                    $stmt->bindParam(':boletin', $boletin);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM vistos");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function getUnread($id=null) {
            $dbh = $this->init();
            try {
                $usuario = $_POST['usuario'];
                $stmt = $dbh->prepare("SELECT idBoletin, numero, fecha FROM boletines 
                                        LEFT JOIN vistos ON boletines.idBoletin = vistos.boletin AND vistos.usuario = :usuario 
                                        WHERE vistos.boletin IS NULL");
                $stmt->bindParam(':usuario', $usuario);
                
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }

        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);                
                $usuario = $_PUT['usuario'];
                $boletin = $_PUT['boletin'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO vistos (usuario,boletin)
                                                VALUES (:usuario,:boletin)");
                $stmt->bindParam(':usuario', $usuario);
                $stmt->bindParam(':boletin', $boletin);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function delete($id=null) {
            $dbh = $this->init();
            try {
                $_DELETE=json_decode(file_get_contents('php://input'), True);
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $usuario = $_DELETE['usuario'];
                $boletin = $_DELETE['boletin'];
                $stmt = $dbh->prepare("DELETE FROM vistos WHERE usuario = :usuario AND boletin = :boletin");
                $stmt->bindParam(':usuario', $usuario);
                $stmt->bindParam(':boletin', $boletin);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }

        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='getUnread')
                    return $this->getUnread($id);
                else{
                    $usuario = $_POST['usuario'];
                    $boletin = $_POST['boletin'];
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = $dbh->prepare("UPDATE vistos SET usuario=:usuario, boletin =:boletin
                                            WHERE usuario = :usuario AND boletin = :boletin");
                    $stmt->bindParam(':usuario', $usuario);
                    $stmt->bindParam(':boletin', $boletin);
                    $dbh->beginTransaction();
                    $stmt->execute();
                    $dbh->commit();
                    echo 'Successfull';
                }
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    Toro::serve(array(
        "/agencias" => "AgenciasHandler",
        "/agencias/:alpha" => "AgenciasHandler",
        "/boletines" => "BoletinesHandler",
        "/boletines/:alpha" => "BoletinesHandler",
        "/categorias" => "CategoriasHandler",
        "/categorias/:alpha" => "CategoriasHandler",
        "/clasificadas" => "ClasificadasHandler",
        "/clasificadas/:alpha" => "ClasificadasHandler",
        "/noticias" => "NoticiasHandler",
        "/noticias/:alpha" => "NoticiasHandler",
        "/periodistas" => "PeriodistasHandler",
        "/periodistas/:alpha" => "PeriodistasHandler",
        "/preferidas" => "PreferidasHandler",
        "/preferidas/:alpha" => "PreferidasHandler",
        "/usuarios" => "UsuariosHandler",
        "/usuarios/:alpha" => "UsuariosHandler",
        "/vistos" => "VistosHandler",
        "/vistos/:alpha" => "VistosHandler",
    ));
?>
