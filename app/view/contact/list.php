<?php 
Defined('BASE_PATH') or die(ACCESS_DENIED);
?>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark"><?= $title; ?></h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?= SITE_URL; ?>">Home</a></li>
                        <?php
                            if($type == 'contact') {
                                echo '<li class="breadcrumb-item active">' .$title. '</li>';
                            }
                            else {
                                echo '<li class="breadcrumb-item"><a href="javascript:void(0)">Contact</a></li>';
                                echo '<li class="breadcrumb-item active">' .$title. '</li>';
                            }
                        ?>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <button id="new" class="btn btn-flat btn-primary">New</button>
                            <div class="float-right">
                                <button id="exportExcel" class="btn btn-flat btn-success"><i class="far fa-file-excel"></i> Export</button>
                                <button id="refresh" class="btn btn-flat btn-info"><i class="fas fa-sync-alt"></i> Refresh</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <input type="hidden" id="contact-type" value="<?= $type; ?>">
                            <table id="contact-table" class="table table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-right">No</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>No. Telepon</th>
                                        <th>Status</th>
                                        <?php 
                                            if($type != 'contact' && $type != 'kas-besar') {
                                                echo '<th class="text-right">Saldo</th>';
                                            }
                                        ?>
                                        <th>Created By</th>
                                        <th>Created On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->

    <?php require_once 'form.php'; ?>
</div>