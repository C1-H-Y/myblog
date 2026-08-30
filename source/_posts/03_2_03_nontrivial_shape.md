---
title: 03.2.3 nontrivial shape
date: 2026-07-21
categories:
  - kwant
--- 


这一节我们考虑一个非平凡的形状，即一个 SQUID 的形状。SQUID 是一个超导量子干涉仪，由两个约瑟夫森结组成。在这里我们用 kwant 来构建一个 SQUID 的形状，然后计算其电导率。

SQUID 的示意图如下：

<div align="center">
  <img src="/images/SQ.png" width="500" alt="SQUID 示意图"/>
</div>

*图 1.2.3-1　SQUID 示意图*

我们定义一个 SQUID 的形状，然后计算其电导率。代码如下：

```python
def make_system(a=1, t=1.0, W=10, L=30):
    lat = kwant.lattice.square(a, norbs=1)

    syst = kwant.Builder()

    # Define the scattering region
    def sq_shape(pos):
        x, y = pos
        return (0 <= x < L) and (0 <= y < W) and not (L/2 - 1 <= x < L/2 + 1 and W/2 - 1 <= y < W/2 + 1)

    syst[lat.shape(sq_shape, (0, 0))] = 4 * t
    syst[lat.neighbors()] = -t

    lead = kwant.Builder(kwant.TranslationalSymmetry((-a, 0)))
    lead[(lat(0, j) for j in range(W))] = 4 * t
    lead[lat.neighbors()] = -t
    syst.attach_lead(lead)
    syst.attach_lead(lead.reversed())

    return syst
```

然后我们计算其电导率：

```python
def plot_conductance(syst, energies):
    data = []
    for energy in energies:
        smatrix = kwant.smatrix(syst, energy)
        data.append(smatrix.transmission(1, 0))
    plt.figure()
    plt.plot(energies, data)
    plt.xlabel("energy [t]")
    plt.ylabel("conductance [e^2/h]")
    plt.show()
```

可以看到，由于 SQUID 的形状，电导率图像出现了明显的干涉条纹，这正是 SQUID 的特征。
