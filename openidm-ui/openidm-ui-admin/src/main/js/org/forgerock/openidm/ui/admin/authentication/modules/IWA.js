/**
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2016 ForgeRock AS.
 * Portions Copyright 2023 Wren Security.
 */

define([
    "jquery",
    "lodash",
    "form2js",
    "org/forgerock/openidm/ui/admin/authentication/AuthenticationAbstractView"

], function($, _,
        Form2js,
        AuthenticationAbstractView) {

    var IWAView = AuthenticationAbstractView.extend({
        template: "templates/admin/authentication/modules/IWA.html",

        knownProperties: AuthenticationAbstractView.prototype.knownProperties.concat([
            "servicePrincipal",
            "keytabFileName",
            "kerberosRealm",
            "kerberosServerName",
            "groupComparisonMethod"
        ]),

        render: function (args) {
            this.data = _.cloneDeep(args);
            this.data.userOrGroupValue = "userRoles";
            this.data.userOrGroupOptions = _.cloneDeep(AuthenticationAbstractView.prototype.userOrGroupOptions);
            this.data.customProperties = this.getCustomPropertiesList(this.knownProperties, this.data.config.properties || {});
            this.data.userOrGroupDefault = this.getUserOrGroupDefault(this.data.config || {});

            this.parentRender(() => {
                this.postRenderComponents({
                    "customProperties":this.data.customProperties,
                    "name": this.data.config.name,
                    "augmentSecurityContext": this.data.config.properties.augmentSecurityContext || {},
                    "userOrGroup": this.data.userOrGroupDefault
                });
            });
        }
    });

    return new IWAView();
});