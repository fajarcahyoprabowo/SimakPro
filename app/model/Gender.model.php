<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

class GenderModel extends Database {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Method getLookup
     * Get Gender Lookup Data
     * @return {object} result
     *                  result.success {boolean}
     *                  result.message {string}
     *                  result.data {array}
     */
    public function getLookup() {
        $result = (object)array(
            'success' => false,
            'message' => '',
            'data' => null
        );

        $query  = "SELECT id, name FROM gender";
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute();

            $result->data = $statement->fetchAll(PDO::FETCH_ASSOC);
            $result->success = true;
        } 
        catch (PDOException $e) {
            $result->message = $e->getMessage();
        }
        catch (Exception $e) {
            $result->message = $e->getMessage();
        }

        return $result;
    }

    public function __destruct() {
        $this->close();
    }
}