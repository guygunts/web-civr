<form id="frm_addedit" method="post" onsubmit="return false;">
    <button type="submit" style="display: none" id="btnsubmit"></button>
    <input type="hidden" name="intent_id" id="intent_id">
    <input type="hidden" name="menu_action" id="menu_action">
	  <input type="hidden" name="service_id_drop" id="service_id_drop">
    <div class="box box-danger">
        <div class="box-body">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="service_id" class="control-label">Service</label>
                    <select id="service_id" name="service_id" class="select form-control" required></select>
                </div>
				<div class="form-group">
                    <label for="grammar_id" class="control-label">grammar</label>
                    <select id="grammar_id" name="grammar_id" class="select form-control" required></select>
                </div>
                <div class="form-group">
                    <label for="user_question" class="control-label">User Question</label>
                    <input id="user_question" name="user_question" type="text" maxlength="100"
                           class="form-control project_name">
                </div>
                <div class="form-group">
                    <label for="intent_tag" class="control-label">Intent Tag</label>
                    <input id="intent_tag" name="intent_tag" type="text" maxlength="100"
                           class="form-control project_name">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" class="active" name="active" id="active" value="1"> &nbsp&nbsp&nbsp Active
                    </label>
                </div>
            </div>

        </div>
    </div>

</form>