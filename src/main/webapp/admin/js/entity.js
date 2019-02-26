function Admin() {
    return Admin("","","");
}
function User() {
    return User("","","");
}
function Operator() {
    return Operator("","","","","");
}
function Order() {
    return Order("",User(),Operator(),"","","","","","","","","");
}
function Step() {
    return Step("","","",Link(),[]);
}
function Link() {
    return Link("","","");
}
function Option() {
    return Option("","","","","");
}
function Admin(id,password,name) {
    var admin = new Object();
    admin.id = id;
    admin.password = password;
    admin.name = name;
    return admin;
}
function User(id,openID,name,phone) {
    var user = new Object();
    user.id = id;
    user.openID = openID;
    user.name = name;
    user.phone = phone;
    return user;
}
function Operator(id,openID,password,name,phone) {
    var operator = new Object();
    operator.id = id;
    operator.openID = openID;
    operator.password = password;
    operator.name = name;
    operator.phone = phone;
    return operator;
};
function Order(id,user,operator,location,phone,beginTime,handleTime,endTime,description,userDescription,repairment,status) {
    var order = new Object();
    order.id = id;
    order.user = user;
    order.operator = operator;
    order.location = location;
    order.phone = phone;
    order.beginTime = beginTime;
    order.handleTime = handleTime;
    order.endTime = endTime;
    order.description = description;
    order.userDescription = userDescription;
    order.repairment = repairment;
    order.status = status;
    return order;
}
function Step(id,name,content,link,options) {
    var step = new Object();
    step.id = id;
    step.name = name;
    step.content = content;
    step.link = link;
    step.options = options;
    return options;
}
function Link(id,name,content) {
    var link = new Object();
    link.id = id;
    link.name = name;
    link.content = content;
    return link;
}
function Option(id,name,content,location,nextStepId) {
    var option = new Object();
    option.id = id;
    option.name = name;
    option.content = content;
    option.location = location;
    option.nextStepId = nextStepId;
    return option;
}