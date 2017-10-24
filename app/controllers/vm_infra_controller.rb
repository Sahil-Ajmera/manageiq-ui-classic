class VmInfraController < ApplicationController
  include VmCommon # common methods for vm controllers
  include VmRemote # methods for VM remote access
  include VmShowMixin

  before_action :check_privileges
  before_action :get_session_data

  after_action :cleanup_action
  after_action :set_session_data

  def self.table_name
    @table_name ||= "vm_infra"
  end

  private

  def features
    [
      ApplicationController::Feature.new_with_hash(
        :role  => "vandt_accord",
        :name  => :vandt,
        :title => _("VMs & Templates")),

      ApplicationController::Feature.new_with_hash(
        :role  => "vms_filter_accord",
        :name  => :vms_filter,
        :title => _("VMs"),),

      ApplicationController::Feature.new_with_hash(
        :role  => "templates_filter_accord",
        :name  => :templates_filter,
        :title => _("Templates"),),
    ]
  end

  def prefix_by_nodetype(nodetype)
    case TreeBuilder.get_model_for_prefix(nodetype).underscore
    when "miq_template" then "templates"
    when "vm"           then "vms"
    end
  end

  def set_elements_and_redirect_unauthorized_user
    @nodetype, id = parse_nodetype_and_id(params[:id])
    prefix = prefix_by_nodetype(@nodetype)

    # Position in tree that matches selected record
    if role_allows?(:feature => "vandt_accord")
      set_active_elements_authorized_user('vandt_tree', 'vandt', VmOrTemplate, id)
    elsif role_allows?(:feature => "#{prefix}_filter_accord")
      set_active_elements_authorized_user("#{prefix}_filter_tree", "#{prefix}_filter", nil, id)
    else
      if (prefix == "vms" && role_allows?(:feature => "vms_instances_filter_accord")) ||
         (prefix == "templates" && role_allows?(:feature => "templates_images_filter_accord"))
        redirect_to(:controller => 'vm_or_template', :action => "explorer", :id => params[:id])
      else
        redirect_to(:controller => 'dashboard', :action => "auth_error")
      end
      return true
    end

    resolve_node_info(params[:id])
  end

  def tagging_explorer_controller?
    @explorer
  end

  def skip_breadcrumb?
    breadcrumb_prohibited_for_action?
  end

  menu_section :inf
  has_custom_buttons

  def simple_dialog_initialize(ra, options)
    @edit = {}
    @edit[:new] = options[:dialog] || {}
    @edit[:wf] = ResourceActionWorkflow.new(@edit[:new], current_user, ra, {})
    @record = Dialog.find_by_id(ra.dialog_id.to_i)
    @edit[:rec_id]   = @record.id
    @edit[:key]      = "dialog_edit__#{@edit[:rec_id] || "new"}"
    @edit[:explorer] = @explorer ? @explorer : false
    @edit[:dialog_mode] = options[:dialog_mode]
    @edit[:current] = copy_hash(@edit[:new])
    @edit[:right_cell_text] = options[:header].to_s
    @in_a_form = true
    @changed = session[:changed] = true
    if @edit[:explorer]
      replace_right_cell(:action => "dialog_provision")
    else
      javascript_redirect :action => 'dialog_load'
    end
  end

  def vm_transform
    if params.has_key?(:id)
      vm = Vm.find_by(:id => params[:id].to_i)
      @right_cell_text = _("Transform VM %{name} to RHV") % {:name => vm.name}
      dialog = Dialog.find_by(:label => 'Transform VM')
      dialog_initialize(
        dialog.resource_actions.first,
        :header     => @right_cell_text,
        :target_id  => vm.id,
        :target_kls => Vm.name
      )
    else
      @right_cell_text = _("Transform VMs to RHV")
      dialog = Dialog.find_by(:label => 'Transform VM')
      simple_dialog_initialize(
        dialog.resource_actions.first,
        :header => @right_cell_text
      )
    end
  end
end
