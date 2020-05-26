import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { FileChooserComponent } from '../../../components/file-chooser/file-chooser.component';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeModel, ITreeState} from 'angular-tree-component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<any> = []

  loading: boolean = false;

  updtUser: any = {
    username: "",
    email: "",
    password: null,
    profileImage: null,
    active: 1
  }
  emailRegexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
  @ViewChild('tree') tree
  
  validEmail: any = {
    reason: "Campo requerido",
    state:false
  }
  
  confirmation: any = {
    email: "",
    password: ""
  }

  checked: boolean = false
  
  changePassword: boolean = false
  
  changePasswordData: any = {
    userId: 0,
    newPassword: "",
    newPasswordConfirm: null
  }

  //Tree properties
  selectedNodes: Array<any> = [];

  state: ITreeState;

  policyNodes: Array<any> = []

  options: ITreeOptions = {
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'id',
    hasChildrenField: 'nodes',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
    nodeHeight: 23,
    allowDragoverStyling: true,
    levelPadding: 10,
    useVirtualScroll: true,
    animateExpand: true,
    useCheckbox: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }
  constructor(
    private modalService: BsModalService,
    private api : ApiService,
    public toast: ToastService
  ) { }

  @ViewChild(FileChooserComponent) fileChooser : FileChooserComponent;

  ngOnInit() {
    this.getUsers();
    this.getUserPermissionPolicyNodes()
  }

  getUsers(){
    this.loading = true
    this.api.Get('/Usuarios/users').subscribe(
      (users: Array<any>) => {
        this.users = users
        // console.log("usuarios", users);
        this.loading = false
      },
      (err: any) => {
        this.loading = false
        this.toast.ShowError("Error al traer usuarios del servidor: " + err.error.error.message)
      }
    )
  }

  getUserPermissionPolicyNodes(){
    this.api.Get("/UserPermissionPolicyNodes").subscribe(
      (policyNodes: Array<any>) => {
        this.policyNodes = this.parsePolicyNodesToExpandAll(policyNodes);
      },
      (err) => {
        this.toast.ShowError("Error al permisos del servidor: " + err.error.error.message)
      }
    )
  }

  parsePolicyNodesToExpandAll(policyNodes): Array<any>{
    policyNodes.forEach(pn => {
      pn.expanded = true;
      if(pn.children && pn.children.length > 0){
        pn.children = this.parsePolicyNodesToExpandAll(pn.children)
      }
    });

    return policyNodes
  }

  mtModalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.validEmail.state = true
    this.mtModalRef = this.modalService.show(template);
    this.selectedNodes = []
  }

  parsePolicyNodesToShowCurrentPermissions(){
    let userPermissions = {};
    this.updtUser.userPermissions.forEach(up => {
      userPermissions[up.id] = true
    });
    this.state = {
      ...this.state,
      selectedLeafNodeIds : userPermissions
    }
  }

  setUpdatingUser(userToUpdate){
    this.updtUser = JSON.parse(JSON.stringify(userToUpdate))
    if(this.updtUser.hasOwnProperty('userPermissions')) this.parsePolicyNodesToShowCurrentPermissions();
    this.changePassword = false;
    this.changePasswordData.userId = userToUpdate.id
    this.changePasswordData.newPassword = ""
  }

  closeModal() {
    this.mtModalRef.hide()
  }

  updateProfileImage(event : any) {
    this.updtUser.profileImage = event
    this.updtUser.hasChangedProfileImage = true
  }

  validateAnEmail(email){
    if(this.emailRegexp.test(email)){
      this.validEmail.state = true
    }
    else{
      this.validEmail.reason = "Formato no válido"
      this.validEmail.state = false
    }
  }

  updateUser(){
    // console.log(this.updtUser);
    this.validateAnEmail(this.updtUser.email)
    this.loading = true;
    this.updtUser.permissionNodeIds = this.selectedNodes;
    if(this.validEmail.state){
      this.api.Post("/Usuarios/"+this.updtUser.id+"/updateUs", this.updtUser).subscribe(
        (users: Array<any>) => {
          this.users = users
          this.loading = false;
          this.toast.ShowSuccess('Información actualizada')
          this.getUsers()
          this.getUserPermissionPolicyNodes()
          this.closeModal()
        },
        (err:any) => {
          this.loading = false;
          this.toast.ShowError('Error al intentar actualizar datos :' + err.error.error.message)
        }
      )
    }
  }

  updateUserPassword(){
    this.loading = true;
    if(this.validEmail.state){
      this.api.Post("/Usuarios/updatePass", this.changePasswordData).subscribe(
        (msg: Array<any>) => {
          this.loading = false;
          this.toast.ShowSuccess('Información actualizada :' + msg)
          this.closeModal()
        },
        (err:any) => {
          this.loading = false;
          this.toast.ShowError('Error al intentar actualizar datos :' + err.error.error.message)
        }
      )
    }
  }

  updateSelectedNodes(event) {
    // console.log("tree",this.state);
    
    let selectedTreeList = Object.entries(event.selectedLeafNodeIds)
      .filter(([key,value]) => value === true)
      .map((node) => node[0]);
    
    this.selectedNodes = selectedTreeList;
  }
}
