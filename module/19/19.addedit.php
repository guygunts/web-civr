<form id="frm_addedit" method="post" onsubmit="return false;">
    <button type="submit" style="display: none" id="btnsubmit"></button>
    <input type="hidden" name="service_id" id="service_id">
    <input type="hidden" name="project_id" id="project_id">
    <input type="hidden" name="menu_action" id="menu_action">
    <div class="box box-danger">
        <div class="box-body">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="service_name" class="control-label">Service Name</label>
                    <input id="service_name" name="service_name" type="text" required="required" maxlength="100"
                           class="form-control project_name">
                </div>
                <div class="form-group">
                    <label for="generate_file" class="control-label">Generate File Name</label>
                    <input id="generate_file" name="generate_file" type="text" maxlength="100"
                           class="form-control project_name">
                </div>
            </div>

        </div>
    </div>

</form>