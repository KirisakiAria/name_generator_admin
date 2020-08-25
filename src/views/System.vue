<template>
  <section class="system">
    <section>
      <h3>基本信息</h3>

      <el-row>
        <el-col :span="12">CPU字节序：{{ systemData.endianness }}</el-col>
        <el-col :span="12">操作系统类型：{{ systemData.type }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">系统名：{{ systemData.platform }}</el-col>
        <el-col :span="12">CPU架构：{{ systemData.arch }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">系统发行版本：{{ systemData.release }}</el-col>
        <el-col :span="12">系统运行时间：{{ systemData.uptime }}秒</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">CPU：{{ systemData.cpus[0].model }}</el-col>
        <el-col :span="12">CPU主频：{{ systemData.cpus[0].speed }}MHZ</el-col>
      </el-row>
    </section>
    <section>
      <h3>资源使用情况</h3>
      <div ref="chart" class="chart"></div>
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
          freemem: 0,
          totalmem: 0,
          cpus: [
            {
              model: '',
              speed: '',
            },
          ],
        },
      }
    },
    computed: {
      options() {
        return {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
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
              name: '访问来源',
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              data: [
                {
                  value: (this.systemData.freemem / 1073741824).toFixed(6),
                  name: '空闲',
                },
                {
                  value: (
                    (this.systemData.totalmem - this.systemData.freemem) /
                    1073741824
                  ).toFixed(6),
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
                color: '#ff6348',
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
          this.draw()
        }
      },
      draw() {
        const chart = echarts.init(this.$refs.chart)
        chart.setOption(this.options)
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.getData()
      })
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
    }
    .chart {
      margin: auto;
      width: 600px;
      height: 600px;
    }
  }
</style>
