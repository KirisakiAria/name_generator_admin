<template>
  <section class="system">
    <section>
      <el-row>
        <el-button type="success" @click="getData">刷新</el-button>
      </el-row>
      <h3>系统信息</h3>
      <el-row>
        <el-col :span="12">操作系统：{{ systemData.os.distro }}</el-col>
        <el-col :span="12">系统平台：{{ systemData.os.platform }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">操作系统架构：{{ systemData.os.arch }}</el-col>
        <el-col :span="12">发行版本：{{ systemData.os.release }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          系统时间：{{ new Date(systemData.time.current) }}
        </el-col>
        <el-col :span="12">时区：{{ systemData.time.timezone }}</el-col>
      </el-row>
      <h3>CPU信息</h3>
      <el-row>
        <el-col :span="12">CPU：{{ systemData.cpu.brand }}</el-col>
        <el-col :span="12">CPU制造商：{{ systemData.cpu.manufacturer }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          CPU核心数：{{ systemData.cpu.physicalCores }}
        </el-col>
        <el-col :span="12">CPU框框数：{{ systemData.cpu.cores }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">CPU默频：{{ systemData.cpu.speed }}GHZ</el-col>
        <el-col :span="12">CPU睿频：{{ systemData.cpu.speedmax }}GHZ</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">2级缓存：{{ systemData.cpu.cache.l2 }}</el-col>
        <el-col :span="12">3级缓存：{{ systemData.cpu.cache.l2 }}</el-col>
      </el-row>
    </section>
    <section>
      <h3>资源使用情况</h3>
      <div class="chart-group">
        <div ref="memChart" class="chart"></div>
        <div ref="cpuChart" class="chart"></div>
      </div>
    </section>
  </section>
</template>
<script>
  import echarts from 'echarts'
  import mixin from '@/mixin/mixin'
  export default {
    name: 'System',
    mixins: [mixin],
    data() {
      return {
        systemData: {
          cpu: { cache: {} },
          load: { currentload: 0 },
          mem: {},
          os: {},
          time: {},
        },
        baseOptions: {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
        },
      }
    },
    computed: {
      memChartOptions() {
        return {
          ...this.baseOptions,
          title: {
            text: '内存使用情况',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#666',
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: 64,
            inRange: {
              colorLightness: [0.1, 1],
            },
          },
          series: [
            {
              name: '内存使用情况',
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              data: [
                {
                  value: (this.systemData.mem.free / 1073741824).toFixed(6),
                  name: '空闲',
                },
                {
                  value: (this.systemData.mem.active / 1073741824).toFixed(6),
                  name: '已使用',
                },
              ].sort(function (a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',
              label: {
                color: '#666',
              },
              labelLine: {
                lineStyle: {
                  color: '#666',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                color: '#ff7f50',
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              },
            },
          ],
        }
      },
      cpuChartOptions() {
        return {
          ...this.baseOptions,
          title: {
            text: 'CPU使用情况',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#666',
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {
              colorLightness: [0.1, 1],
            },
          },
          series: [
            {
              name: 'cpu使用情况',
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 100 - this.systemData.load.currentload,
                  name: '空闲',
                },
                {
                  value: this.systemData.load.currentload,
                  name: '已使用',
                },
              ].sort(function (a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',
              label: {
                color: '#666',
              },
              labelLine: {
                lineStyle: {
                  color: '#666',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                color: '#5352ed',
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              },
            },
          ],
        }
      },
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.system)
        if (res.data.code == '1000') {
          this.systemData = res.data.data
          this.$nextTick(function () {
            this.draw()
          })
        }
      },
      draw() {
        const memChart = echarts.init(this.$refs.memChart)
        memChart.setOption(this.memChartOptions)

        const cpuChart = echarts.init(this.$refs.cpuChart)
        cpuChart.setOption(this.cpuChartOptions)
      },
    },
    mounted() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .system {
    font-size: 16px;
    .el-row {
      margin: 16px 0;
    }
    h3 {
      margin: 25px 0;
      font-weight: bold;
    }
    .chart-group {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .chart {
        margin: auto;
        width: 600px;
        height: 600px;
      }
    }
  }
</style>
