{{/*
Définit un nom standardisé pour une ressource
*/}}
{{- define "gestion-commande-mern.name" -}}
{{ .Chart.Name | lower }}
{{- end }}

{{/*
Définit un nom complet pour une ressource, incluant le nom du release
*/}}
{{- define "gestion-commande-mern.fullname" -}}
{{ printf "%s-%s" .Release.Name (include "gestion-commande-mern.name" .) | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Ajoute des labels standardisés pour les ressources
*/}}
{{- define "gestion-commande-mern.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ include "gestion-commande-mern.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Ajoute des labels pour les sélections de ressources
*/}}
{{- define "gestion-commande-mern.selectorLabels" -}}
app.kubernetes.io/name: {{ include "gestion-commande-mern.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Définit le nom du ServiceAccount pour une ressource
*/}}
{{- define "gestion-commande-mern.serviceAccountName" -}}
{{ printf "%s-%s" (include "gestion-commande-mern.fullname" .) "serviceaccount" }}
{{- end }}
