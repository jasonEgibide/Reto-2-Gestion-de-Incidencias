<template>
  <div>
    <CuadrosDatos />
    <div class="container mt-2">
      <div class="row mb-3 py-3">
        <div class="col-12 d-flex flex-wrap align-items-center gap-2">
          <div class="row w-100">
            <FiltroCampus
              :resetFilters="resetFilters"
              @updateSelections="handleSelections"
            />
            <div class="col-12 col-lg-6 d-flex flex-column gap-2">
              <button class="btn btn-dark w-100" @click="aplicarFiltro(1)">Aplicar Filtro</button>
              <button class="btn btn-dark w-100" @click="borrarFiltros">Borrar Filtros</button>
            </div>
          </div>
        </div>

      </div>
      <h2 class="text-primary mb-1 fs-4">Incidencias <span v-if="priorityText">{{ priorityText }}</span></h2>
      <hr>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th class="p-1 text-center align-middle">ID Incidencia</th>
              <th class="p-1 text-center align-middle">Título</th>
              <th class="p-1 text-center align-middle">Maquina</th>
              <th class="p-1 text-center align-middle">Prioridad</th>
              <th class="p-1 text-center align-middle">Gravedad Inicidencia</th>
              <th class="p-1 text-center align-middle">Estado Inicidencia</th>
              <th class="p-1 text-center align-middle">Fec. creación</th>
              <th class="p-1 text-center align-middle">Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="incidencia in incidencias" :key="incidencia.id">
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  {{ incidencia.id }}
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  {{ incidencia.titulo }}
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  {{ incidencia.nombre_maquina }}
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  <span v-if="incidencia.prioridad === 1" class="badge bg-danger">Alta</span>
                  <span v-else-if="incidencia.prioridad === 2" class="badge bg-warning">Media</span>
                  <span v-else class="badge bg-success">Baja</span>
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  <span v-if="incidencia.gravedad_incidencia === 1" class="badge bg-danger">Parada</span>
                  <span v-else class="badge bg-success">Operativa</span>
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  <span v-if="incidencia.estado === 0" class="badge bg-warning">Pendiente</span>
                  <span v-else-if="incidencia.estado === 1" class="badge bg-success">En curso</span>
                  <span v-else class="badge bg-warning">Parada</span>
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  {{ incidencia.fecha_creacion }}
                </router-link>
              </td>
              <td class="fs-6 p-1 text-center align-middle">
                <router-link :to="{ name: 'IncidenciaDetalles', query: { id: incidencia.id } }"
                  class="d-block text-decoration-none" style="color: inherit;">
                  {{ incidencia.categoria }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Paginación -->
      <div class="row">
        <div class="col-12 d-flex justify-content-center" style="z-index:1;position:relative;">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                <button class="page-link"
                        :disabled="pagination.current_page === 1"
                        @click="selectedCampusId == null && selectedSectionId == null ? fetchIncidencias(null, pagination.current_page - 1) : aplicarFiltro(pagination.current_page - 1)">
                  Anterior
                </button>
              </li>
              <li class="page-item" v-for="page in pages" :key="page"
                :class="{ active: page === pagination.current_page }">
                <button class="page-link" @click="selectedCampusId == null && selectedSectionId == null ? fetchIncidencias(null, page) : aplicarFiltro(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                <button class="page-link"
                        :disabled="pagination.current_page === pagination.last_page"
                        @click="selectedCampusId == null && selectedSectionId == null ? fetchIncidencias(null, pagination.current_page + 1) : aplicarFiltro(pagination.current_page + 1)">
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <hr>
      <h2 class="text-primary mb-1 fs-4">Mantenimientos</h2>
      <hr>
      <MantenimientosList />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CuadrosDatos from '@/components/CuadrosDatos.vue';
import IncidenciasList from '@/components/IncidenciasList.vue';
import FiltroCampus from '@/components/FiltroCampus.vue';
import MantenimientosList from '@/components/MantenimientosList.vue';
import { API_BASE_URL } from '@/config.js';
import { useToast } from 'vue-toastification';

export default {
  name: 'Home',
  components: {
    CuadrosDatos,
    IncidenciasList,
    FiltroCampus,
    MantenimientosList,
  },
  data() {
    return {
      incidencias: [],
      selectedCampusId: null,
      selectedSectionId: null,
      resetFilters: false,
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
      },
      token: sessionStorage.getItem('token'),
      toast: useToast(),
    };
  },
  computed: {
    priorityText() {
      const priority = this.$route.query.priority;
      switch (priority) {
        case '1':
          return 'Prioridad 1';
        case '2':
          return 'Prioridad 2';
        case '3':
          return 'Prioridad 3';
        case '0':
          return 'Resueltas';
        default:
          return '';
      }
    },
    pages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  watch: {
    '$route.query.priority': {
      immediate: true,
      handler(newPriority) {
        this.fetchIncidencias(newPriority);
      },
    },
  },
  methods: {
    fetchIncidencias(priority = null, page = 1) {
      let url = `${API_BASE_URL}/incidencias?page=${page}`;
      if (priority) {
        url += `&priority=${priority}`;
      }

      console.log('URL fetchIncidencias:', url);

      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          const apiResponse = response.data?.data;
          this.incidencias = apiResponse?.data || [];
          this.pagination = {
            current_page: apiResponse.current_page,
            last_page: apiResponse.last_page,
            per_page: apiResponse.per_page,
          };
        })
        .catch((error) => {
          console.error('Error al obtener las incidencias:', error);
          this.incidencias = [];
        });
    },
    aplicarFiltro(page = 1) {
      console.log("Campus ID:", this.selectedCampusId);
      console.log("Section ID:", this.selectedSectionId);

      let url = `${API_BASE_URL}/incidencias`;
      
      if (this.selectedCampusId > 0) {
        console.log('campus ID: ', this.selectedCampusId);
        console.log('Section ID: ', this.selectedSectionId);
        if ( this.selectedSectionId > 0){
          url += `/section/${this.selectedSectionId}`;
        } else {
          url += `/campus/${this.selectedCampusId}`;
        }

        url += `?page=${page}`;
        console.log('URL aplicarFiltro: ', url);
        
      }
      
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          const apiResponse = response.data?.data;
          this.incidencias = apiResponse?.data || [];
          this.pagination = {
            current_page: apiResponse.current_page,
            last_page: apiResponse.last_page,
            per_page: apiResponse.per_page,
          };
        })
        .catch((error) => {
          //console.error(error);
          this.toast.warning('No se encontraron incidencias para el filtro seleccionado.', {
              position: 'top-right',
            });
            return;
        });
    },
    borrarFiltros() {
      this.selectedCampusId = null;
      this.selectedSectionId = null;
      this.resetFilters = true;
      setTimeout(() => {
        this.resetFilters = false;
      }, 0);
      this.$router.push('/home');
      this.fetchIncidencias();
    },
    handleSelections({ campusId, sectionId }) {
      this.selectedCampusId = campusId;
      this.selectedSectionId = sectionId;
    },
  },
  created() {
    this.fetchIncidencias();
  },
};
</script>