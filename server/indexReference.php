<?php
    require("Toro.php");


    class DBHandlerProduct {
        function init() {
            try {
                $dbh = new PDO('sqlite:test.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }

        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM product WHERE product_receipt_id = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM product");
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
                $product_quantity = $_PUT['product_quantity'];
                $product_description = $_PUT['product_description'];
                $product_unit_value = $_PUT['product_unit_value'];
                $product_receipt_id = $_PUT['product_receipt_id'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO product (product_quantity,product_description,product_unit_value,product_receipt_id)
                                                VALUES (:product_quantity,:product_description,:product_unit_value,:product_receipt_id)");
                $stmt->bindParam(':product_quantity', $product_quantity);
                $stmt->bindParam(':product_description', $product_description);
                $stmt->bindParam(':product_unit_value', $product_unit_value);
                $stmt->bindParam(':product_receipt_id', $product_receipt_id);
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
                $stmt = $dbh->prepare("DELETE FROM product WHERE product_id = :id");
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
                $product_quantity = $_POST['product_quantity'];
                $product_description = $_POST['product_description'];
                $product_unit_value = $_POST['product_unit_value'];
                $product_receipt_id = $_POST['product_receipt_id'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE product SET product_quantity=:product_quantity,
                                        product_description=:product_description, product_unit_value=:product_unit_value,
                                        product_receipt_id=:product_receipt_id WHERE product_id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':product_quantity', $product_quantity);
                $stmt->bindParam(':product_description', $product_description);
                $stmt->bindParam(':product_unit_value', $product_unit_value);
                $stmt->bindParam(':product_receipt_id', $product_receipt_id);
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

    class DBHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:test.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM receipt WHERE receipt_id = :id");
                    $stmt->bindParam(':id', $id);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM receipt");
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
        function getLast() {
            $dbh = $this->init();
            try {
                $stmt = $dbh->prepare("SELECT * FROM receipt ORDER BY receipt_id DESC LIMIT 1");
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
                $receipt_client = $_PUT['receipt_client'];
                $receipt_taxes = $_PUT['receipt_taxes'];
                $receipt_total = $_PUT['receipt_total'];
                $receipt_date = $_PUT['receipt_date'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO receipt (receipt_client,receipt_taxes,receipt_total,receipt_date)
                                                VALUES (:receipt_client,:receipt_taxes,:receipt_total,:receipt_date)");
                $stmt->bindParam(':receipt_client', $receipt_client);
                $stmt->bindParam(':receipt_taxes', $receipt_taxes);
                $stmt->bindParam(':receipt_total', $receipt_total);
                $stmt->bindParam(':receipt_date', $receipt_date);
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
                $stmt = $dbh->prepare("DELETE FROM receipt WHERE receipt_id = :id");
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
                    return $this->getLast();
                $receipt_client = $_POST['receipt_client'];
                $receipt_taxes = $_POST['receipt_taxes'];
                $receipt_total = $_POST['receipt_total'];
                $receipt_date = $_POST['receipt_date'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE receipt SET receipt_client=:receipt_client,
                                        receipt_taxes=:receipt_taxes, receipt_total=:receipt_total,
                                        receipt_date=:receipt_date WHERE receipt_id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':receipt_client', $receipt_client);
                $stmt->bindParam(':receipt_taxes', $receipt_taxes);
                $stmt->bindParam(':receipt_total', $receipt_total);
                $stmt->bindParam(':receipt_date', $receipt_date);
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
    Toro::serve(array(
        "/receipt" => "DBHandler",
        "/receipt/:alpha" => "DBHandler",
        "/product" => "DBHandlerProduct",
        "/product/:alpha" => "DBHandlerProduct",
    ));
?>